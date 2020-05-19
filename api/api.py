from flask import Flask, session, request
from flask_cors import CORS
from dictionary import dictionary, morph, themes
import constructor
from constructor import basic_constructor
import json
import random
import os
import werkzeug

app = Flask(__name__)
CORS(app)

app.secret = os.getenv('OTGOVORKI_FLASK_SECRET_KEY')


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
                        dictionary, 
                        morph, 
                        context=theme, 
                        subj_sex=sex, 
                        tense=tense,
                        is_nonsense=is_nonsense)
        return json.dumps(excuse)
    except ValueError:
        return json.dumps('error generating an excuse')




@app.errorhandler(werkzeug.exceptions.BadRequest)
def handle_bad_request(e):
    return "<h1>400</h1><p>The request seems bad. If you are trying to mess around with the API, get off my lawn! I mean, use the main site.</p>", 400

@app.errorhandler(werkzeug.exceptions.NotFound)
def handle_bad_request(e):
    return "<h1>404</h1><p>This API is not supposed to be used outside of the main side yet. Try the main site?</p>", 404

@app.errorhandler(werkzeug.exceptions.InternalServerError)
def handle_bad_request(e):
    return "<h1>500</h1><p>I am sorry, David. Could not generate otgovorka for you. Try again?</p>", 500

