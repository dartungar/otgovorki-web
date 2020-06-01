from flask import Flask, session, request, url_for, send_from_directory, render_template
from flask_cors import CORS
from .api.dictionary import get_dictionary, morph, themes
from .api import constructor
from .api.constructor import basic_constructor
from .api import db 
from .api.db import Otgovorka, session, desc 
import json
import random
import uuid
import os
import werkzeug


def create_app(test_config=None, *args, **kwargs):
    # создаем и настраиваем приложение
    app = Flask(__name__, instance_relative_config=True, static_folder=f"./build", static_url_path="/")
    CORS(app)
    app.config.from_mapping(
        SECRET_KEY=os.getenv('OTGOVORKI_FLASK_SECRET_KEY')
    )    

    if test_config is None:
        # если не тестим - загружаем боевой конфиг
        app.config.from_pyfile("config.py", silent=True)
    else:
        app.config.from_mapping(test_config)

    # удостоверяемся, что папка для приложения создана
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    CORS(app)

    # main view
    @app.route("/")
    def index():
        print(app.static_folder)
        return app.send_static_file("index.html")


    # generate otgovorka based on url parameters
    @app.route("/api/generate/get")
    def get_specific():
        plausibility = request.args['plausibility']
        is_nonsense = True if plausibility == 'insane' else False
        theme = request.args['theme']
        if theme == 'random':
            theme = random.choice(themes)

        sex = request.args['sex']
        tense = request.args['tense']

        try: 
            excuse = basic_constructor(
                            get_dictionary(app_name=__name__), 
                            morph, 
                            context=theme, 
                            subj_sex=sex, 
                            tense=tense,
                            is_nonsense=is_nonsense)
            response = {'id': str(uuid.uuid4()), 'content': excuse}
            return json.dumps(response)
        except ValueError:
            return json.dumps('error generating an excuse')


    # when upvoted, add generated otgovorka to DB
    @app.route('/api/generate/post', methods=['POST'])
    def post_otgovorka():
        data = request.get_json()
        try:
            id = uuid.UUID(data['id']).hex
        except: #TODO нормальная ошибка
            raise ValueError('Badly formatted UUID string!')
        # check if generated otgovorka with ID exists
        otgovorka = session.query(Otgovorka).filter_by(id=id).first()
        if not otgovorka:
        # if not, create one
            otgovorka = Otgovorka(id=id, content=data['content'])
            print(f'creating otgovorka: {otgovorka}')
            session.add(otgovorka)
        # also increment likes count of said type
        upvote_type = data['type']
        # TODO: рефакторнуть во что-то разумное
        if upvote_type == 1:
            if not otgovorka.likes_count:
                otgovorka.likes_count = 1
            else:
                otgovorka.likes_count += 1
        elif upvote_type == 2:
            if not otgovorka.laughs_count:
                otgovorka.laughs_count = 1
            else:
                otgovorka.laughs_count += 1
        elif upvote_type == 3:
            if not otgovorka.doubts_count:
                otgovorka.doubts_count = 1
            else:
                otgovorka.doubts_count += 1
        else:
            raise ValueError('Invalid type of upvote. Upvote types are 1 (like), 2 (laugh), or 3 (doubt')
        
        # print(otgovorka.to_json());
        session.commit()
        return json.dumps(otgovorka.to_json()), 200, {'ContentType':'application/json'} 


    @app.route('/api/otgovorki/get')
    def get_all_otgovorki():
        sort_type_dict = {'like': 'likes_count', 'laugh': 'laughs_count', 'doubt': 'doubts_count'}
        sort_type = sort_type_dict[request.args['sort']] if request.args['sort'] else 'likes_count'
        offset = int(request.args['currentNum']) if request.args['currentNum'] else 0
        limit = int(request.args['numToLoad']) if request.args['numToLoad'] else 10
        # get list of all otgovorki
        otgovorki = session.query(Otgovorka).order_by(desc(sort_type))[offset:limit]
        print(otgovorki)
        # make it a JSON object with JSONified otgovorki
        otgovorki_json = json.dumps([o.to_json() for o in otgovorki])
        return otgovorki_json, 200, {'ContentType':'application/json'} 






    @app.route('/api/otgovorki/upvotes/get')
    def get_upvotes_for_otvovorka():
        # get otgovorka's upvotes by ID
        id = uuid.UUID(request.get_json()['id']).hex 
        otgovorka = session.query(Otgovorka).filter_by(id=id).first()
        # make them a JSON object
        return json.dumps(otgovorka.to_json()), 200, {'ContentType':'application/json'} 


    @app.route('/api/otgovorka/upvotes/post')
    def post_upvote():
        # find otgovorka by ID
        # increment upvotes count by 1
        # based on passed type of upvote (like, laugh, doubt)
        pass 


    @app.route('/api/submit/post', methods=['POST'])
    def submit_user_otgovorka():
        # create new otgovorka based on user's text
        # from Submit page
        data = request.get_json()
        otgovorka = Otgovorka(id=str(uuid.uuid4()), type=1, content=data['content'])
        print(f'creating submitted otgovorka: {otgovorka}')
        session.add(otgovorka)
        session.commit()
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 


    ### ERROR HANDLERS ###
    
    app.route("/static/js/<filename>")
    def serve_js(filename):
        return send_from_directory("/static/js", filename)


    @app.route(f"/static/data/otgovorki.xlsx")
    def return_poop():
        return "<h1>💩</h1>"


    # simple error handlers
    @app.errorhandler(werkzeug.exceptions.BadRequest)
    def handle_bad_request(e):
        return "<h1>400</h1><p>The request seems bad. If you are trying to mess around with the API, don't. Use the main site instead.</p>", 400

    @app.errorhandler(werkzeug.exceptions.NotFound)
    def handle_not_found(e):
        return "<h1>404</h1><p>This API is not supposed to be used outside of the main site yet. Try the main site?</p>", 404

    @app.errorhandler(werkzeug.exceptions.InternalServerError)
    def handle_internal_error(e):
        return "<h1>500</h1><p>I am sorry, David. I could not generate otgovorka for you. Try again?</p>", 500


    return app


# TODO: боле фласконическое создание приложения
app = create_app()