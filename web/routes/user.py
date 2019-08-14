from flask import Blueprint, render_template
from ..db import get_lurker_collection
from bson.json_util import dumps

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
                'userId': '111703434985529344'
            }},
        {
            '$group': {
                '_id': "$gameName",
                'time': {'$sum': {
                    '$divide': [{
                        '$subtract': [
                            "$sessionEnd", "$sessionBegin"
                        ]}, 1000
                    ]}
                }
            }
        },
        {
            '$sort': {
                "_id": 1
            }
        }])

    return render_template('user-time.html', user_info=user, games=games, times=dumps(times))


@user_bp.route('/<user_id>/<game_name>')
def get_user_game_graph(user_id):
    coll = get_lurker_collection()

    user = coll.discord_db_user.find_one({'userId': user_id})
    times = coll.game_time.find({'userId': user_id})
    games = times.distinct('gameName')
    games.sort()

    times = coll.game_time.aggregate([
        {
            '$match': {
                'userId': '111703434985529344'
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
                        ]}, 1000
                    ]}
                }
            }
        },
        {
            '$sort': {
                "_id.gameName": 1
            }
        }])

    return render_template('user-time.html', user_info=user, games=games, times=times)
