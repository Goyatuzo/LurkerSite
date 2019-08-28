from datetime import datetime, timedelta

from ...db import get_game_times


def get_stats_bar_graph():
    game_times = get_game_times()

    time_query = game_times.aggregate([
        {
            '$match': {
                'sessionEnd': {'$gte': datetime.now() - timedelta(days=14)}
            }
        },
        {
            '$group': {
                '_id': {
                    'gameName': "$gameName"
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
        },
        {
            '$limit': 10
        },
        {
            '$project': {
                '_id': 0,
                'gameName': '$_id.gameName',
                'time': '$time'
            }
        }
    ])

    bar_graph = list(time_query)
    names = [time['gameName'] for time in bar_graph]

    return bar_graph, names
