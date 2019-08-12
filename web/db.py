import os

from pprint import pprint
from pymongo import MongoClient
from flask import current_app, g
from flask.cli import with_appcontext


def get_db():
    client = MongoClient(os.environ['LURKER_SITE_DB'])
    db = client.admin
    serverStatusResult = db.command("serverStatus")
    pprint(serverStatusResult)