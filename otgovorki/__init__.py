from flask import Flask, session, request, url_for, send_from_directory, render_template
from flask_cors import CORS
from .api.dictionary import get_dictionary, morph, themes
from .api import constructor
from .api.constructor import basic_constructor
import json
import random
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

    # the whole mighty API oh yeah!
    # generate otgovorka based on url parameters
    @app.route("/api/get")
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
            return json.dumps(excuse)
        except ValueError:
            return json.dumps('error generating an excuse')

    
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