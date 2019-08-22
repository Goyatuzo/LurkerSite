import re
from flask import Blueprint, jsonify, request, Response
from bson.json_util import dumps

from ..db import get_game_times

api_game_time_bp = Blueprint(
    'api-game-time', __name__, url_prefix='/api/time')


@api_game_time_bp.route('/feed/<user_id>', methods=['GET'])
def get_feed(user_id: str):
    """Get a feed of the past 5 games played."""
    game_times_coll = get_game_times()

    times = game_times_coll.aggregate([
        {
            '$match': {
                'userId': user_id
            }
        },
        {
            '$sort': {
                'sessionEnd': -1
            }
        },
        {
            '$limit': 5
        },
        {
            '$project': {
                '_id': {'$toString': '$_id'},
                'gameName': '$gameName',
                'gameDetail': '$gameDetail',
                'gameState': '$gameState',
                'time': {'$sum': {
                    '$divide': [{
                        '$subtract': [
                            "$sessionEnd", "$sessionBegin"
                        ]}, 3600000
                    ]}
                },
                'sessionEnd': '$sessionEnd'
            }
        }
    ])

    stored = list(times)

    for i in range(len(stored)):
        # Need to manually add the UTC timezone to this string, since it doesn't automatically do so.
        stored[i]['sessionEnd'] = stored[i]['sessionEnd'].isoformat() + \
            '+00:00'

    return jsonify(stored)
