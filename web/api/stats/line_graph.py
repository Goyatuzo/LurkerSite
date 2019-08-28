from datetime import datetime, timedelta

from ...db import get_game_times


def get_stats_line_graph():
    game_times = get_game_times()

    time_query = game_times.aggregate([
        {
            '$match': {
                'sessionEnd': {'$gte': datetime.now() - timedelta(days=2)}
            }
        },
        {
            '$sort': {
                'sessionEnd': -1
            }
        },
        {
            '$project': {
                '_id': 0
            }
        }
    ])

    line_graph = list(time_query)

    for entry in line_graph:
        entry['sessionBegin'] = entry['sessionBegin'].isoformat() + '+00:00'
        entry['sessionEnd'] = entry['sessionEnd'].isoformat() + '+00:00'

    return line_graph
