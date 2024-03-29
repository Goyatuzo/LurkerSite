from flask import Blueprint, jsonify

from .stats.bar_graph import get_stats_bar_graph
from .stats.game_name import hours_sum_past_year
from .stats.line_graph import get_stats_line_graph
from .stats.past_two_weeks import get_past_two_weeks
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
                'gameName': 1,
                'gameDetail': 1,
                'gameState': 1,
                'largeAssetText': 1,
                'smallAssetText': 1,
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


@api_game_time_bp.route('/stats/<user_id>/<game_name>/<detail>', methods=['GET'])
def get_stats_for_game(user_id: str, game_name: str, detail: str):
    """Get a feed of the past 5 games played."""
    time_data, names = get_past_two_weeks(user_id, game_name, detail)

    return jsonify(time_data=time_data, names=names)


@api_game_time_bp.route('/stats', methods=['GET'])
def get_stats():
    """Get a feed of the past 5 games played."""
    bar_graph, names = get_stats_bar_graph()
    line_graph = get_stats_line_graph()

    return jsonify(most_played=bar_graph, game_names=names, played_hours=line_graph)


@api_game_time_bp.route('/game/all-stats/<game_name>', methods=['GET'])
def get_all_game_data(game_name: str):
    return jsonify(past_year=hours_sum_past_year(game_name))


@api_game_time_bp.route('/game/<game_name>', methods=['GET'])
def get_past_year_by_game_name(game_name: str):
    return jsonify(hours_sum_past_year(game_name))
