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
        }
    ])

    bar_graph = list(time_query)
    names = [time['_id']['gameName'] for time in bar_graph]

    return bar_graph, names
