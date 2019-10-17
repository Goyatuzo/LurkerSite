
import os
from flask import Flask, url_for
from bson.objectid import ObjectId

query_string = str(ObjectId())


def static_url_for(filename):
    return url_for('static', filename=filename, q=query_string)


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from .routes.home import home_bp
    from .routes.user import user_bp
    from .routes.game import game_bp

    app.register_blueprint(home_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(game_bp)

    from .api.search import api_search_bp
    from .api.game_time import api_game_time_bp

    app.register_blueprint(api_search_bp)
    app.register_blueprint(api_game_time_bp)

    from . import db
    db.init_app(app)

    # Attach the static url for func to jinja
    app.jinja_env.globals.update(static_url_for=static_url_for)

    return app
