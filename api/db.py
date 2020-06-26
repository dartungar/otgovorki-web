from sqlalchemy import create_engine, desc, Column, ForeignKey, String, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
# from sqlalchemy.sql import *
import os
import uuid

Base = declarative_base()
engine = create_engine(os.environ['DATABASE_URL_OTGOVORKI']) 
DBSession = sessionmaker(bind=engine)
session = DBSession()

class Otgovorka(Base):
    __tablename__ = 'otgovorki'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    content = Column(String)
    type = Column(Integer, default=0) # 0: generated, 1: submitted
    likes_count = Column(Integer, default=0)
    laughs_count = Column(Integer, default=0)
    doubts_count = Column(Integer, default=0)

    def __repr__(self):
        return f'{self.content} Likes: {self.likes_count}. Laughs: {self.laughs_count} Doubts: {self.doubts_count}.'

    def to_json(self):
        return {'id': str(self.id), 'content': self.content, 'likes_count': self.likes_count, 'laughs_count': self.laughs_count, 'doubts_count': self.doubts_count}

if not engine.dialect.has_table(engine, 'otgovorki'):
    Base.metadata.create_all(engine)

