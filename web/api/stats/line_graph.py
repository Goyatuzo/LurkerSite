import pytz

from datetime import datetime, timedelta

from ...db import get_game_times


def get_stats_line_graph():
    game_times = get_game_times()

    limit = datetime.now().astimezone(pytz.utc) - timedelta(days=2)
    curr = datetime.now().astimezone(pytz.utc).replace(
        minute=0, second=0, microsecond=0)

    time_count = {}

    while curr > limit:
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
                '$group': {
                    '_id': '$userId',
                }
            },
            {
                '$group': {
                    '_id': 1,
                    'count': {
                        '$sum': 1
                    }
                }
            },
            {
                '$project': {
                    '_id': 0
                }
            }
        ])

        line_graph = list(time_query)

        time_count[curr.isoformat()] = line_graph
        curr = curr - timedelta(hours=1)

    return time_count
