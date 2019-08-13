import os

import click
from pymongo import MongoClient
from flask import current_app, g
from flask.cli import with_appcontext


def get_db() -> MongoClient:
    if 'db' not in g:
        url = os.environ["LURKER_SITE_DB"] + \
            '&ssl=true&ssl_cert_reqs=CERT_NONE'
        client = MongoClient(url)
        g.db = client

    return g.db


def get_lurker_collection():
    """Get the collection that contains data pertaining to Lurker Bot. Available documents are:
    * discord_db_user
    * game_time"""
    db = get_db()

    return db['lurker-bot']


def close_db(e=None):
    db: MongoClient = g.pop('db', None)

    if db is not None:
        db.close()


def init_app(app):
    app.teardown_appcontext(close_db)
