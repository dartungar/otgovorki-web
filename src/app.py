from flask import Flask
from flask_cors import CORS
from time import sleep
import json
import random

app = Flask(__name__)
CORS(app)


@app.route("/api/random")
def random_word():
    word = random.choice(["еби гусей, жди ответного гудка", "бей набат", "звоните 01", "бегай и кричи в панике",
                          "забейся в угол и рыдай", "готовь плов", "постарайся избегать подобных ситуаций"])
    return json.dumps(word)
