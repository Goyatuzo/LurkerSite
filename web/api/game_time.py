from flask import Blueprint, jsonify, request, Response
from bson.json_util import dumps
import re
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
            '$limit': 15
        },
        {
            '$project': {
                '_id': 0,
                'gameName': '$gameName',
                'gameDetail': '$gameDetail',
                'gameState': '$gameState',
                'time': {'$sum': {
                    '$divide': [{
                        '$subtract': [
                            "$sessionEnd", "$sessionBegin"
                        ]}, 3600000
                    ]}
                }
            }
        }
    ])

    stored = list(times)

    return jsonify(stored)
