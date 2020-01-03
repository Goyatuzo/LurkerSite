from flask import Blueprint, render_template, request
from datetime import datetime, timedelta

from ..db import get_lurker_database, get_game_times
from bson.json_util import dumps
import json

user_bp = Blueprint(
    'user', __name__, template_folder='templates', url_prefix='/user')


def get_from_date(request: request) -> datetime:
    """Given the request, extract the from date string and attempt to parse it into a datetime
    object. If it fails, it will automatically return the minimum date."""
    from_date_str = request.args.get('from')

    if from_date_str == 'all':
        from_date = datetime.min
    else:
        from_date = datetime.now() - timedelta(days=14)

    return from_date


@user_bp.route('/<user_id>')
def get_user_graph(user_id):
    try:
        coll = get_lurker_database()
        game_collection = get_game_times()

        from_date = get_from_date(request)

        user = coll.discord_db_user.find_one({'userId': user_id})
        times = game_collection.find({'userId': user_id})

        times = game_collection.aggregate([
            {
                '$match': {
                    'userId': user_id,
                    'sessionEnd': {'$gte': from_date}
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
                    "time": -1
                }
            }])

        saved = list(times)

        return render_template('user-time.html', user_info=user, times=saved, user_id=user_id, drill_deeper=True)
    except Exception as e:
        print(e)
        return render_template('user-time-error.html'), 500


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
    try:
        coll = get_lurker_database()
        game_collection = get_game_times()

        from_date = get_from_date(request)

        user = coll.discord_db_user.find_one({'userId': user_id})
        times = game_collection.find({'userId': user_id})
        times = game_collection.aggregate([
            {
                '$match': {
                    'userId': user_id,
                    'gameName': game_name,
                    'sessionEnd': {'$gte': from_date}
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
            },
            {
                '$sort': {
                    'time': -1
                }
            }])

        saved = list(times)

        return render_template('user-time.html', user_info=user, times=saved, drill_deeper=False)
    except Exception as e:
        print(e)
        return render_template('user-time-error.html'), 500
