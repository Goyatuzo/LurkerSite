
import os
from flask import Flask


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

    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

    from .routes.home import home_bp
    from .routes.user import user_bp

    app.register_blueprint(home_bp)
    app.register_blueprint(user_bp)

    from .api.search import api_search_bp

    app.register_blueprint(api_search_bp)

    from . import db
    db.init_app(app)

    return app
