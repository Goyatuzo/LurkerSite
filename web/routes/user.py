from flask import Blueprint, render_template
from ..db import get_lurker_collection
from bson.json_util import dumps
import json

user_bp = Blueprint(
    'user', __name__, template_folder='templates', url_prefix='/user')


@user_bp.route('/<user_id>')
def get_user_graph(user_id):
    coll = get_lurker_collection()

    user = coll.discord_db_user.find_one({'userId': user_id})
    times = coll.game_time.find({'userId': user_id})
    games = times.distinct('gameName')
    games.sort()

    times = coll.game_time.aggregate([
        {
            '$match': {
                'userId': user_id
            }},
        {
            '$group': {
                '_id': "$gameName",
                'time': {'$sum': {
                    '$divide': [{
                        '$subtract': [
                            "$sessionEnd", "$sessionBegin"
                        ]}, 3600000
                    ]}
                }
            }
        },
        {
            '$sort': {
                "_id": 1
            }
        }])

    return render_template('user-time.html', user_info=user, games=games, times=dumps(times), drill_deeper='true')


def get_game_label(time):
    labels = time['_id']

    ret = labels['gameName']

    if 'gameDetail' in labels and labels['gameDetail'] is not None:
        ret += ' - ' + labels['gameDetail']

    if 'gameState' in labels and labels['gameState'] is not None:
        ret += ' - ' + labels['gameState']

    if 'gameType' in labels and labels['gameType'] is not None:
        ret += ' - ' + labels['gameType']

    return ret


@user_bp.route('/<user_id>/<game_name>')
def get_user_game_graph(user_id, game_name):
    coll = get_lurker_collection()

    user = coll.discord_db_user.find_one({'userId': user_id})
    times = coll.game_time.find({'userId': user_id})
    times = coll.game_time.aggregate([
        {
            '$match': {
                'userId': user_id,
                'gameName': game_name
            }},
        {
            '$group': {
                '_id': {
                    'gameName': "$gameName",
                    'gameDetail': "$gameDetail",
                    'gameState': "$gameState",
                    'gameType': "$gameType"
                },
                'time': {'$sum': {
                    '$divide': [{
                        '$subtract': [
                            "$sessionEnd", "$sessionBegin"
                        ]}, 3600000
                    ]}
                }
            }
        }])

    saved = list(times)

    games = [get_game_label(i) for i in saved]

    return render_template('user-time.html', user_info=user, games=games, times=json.dumps(saved), drill_deeper='false')
