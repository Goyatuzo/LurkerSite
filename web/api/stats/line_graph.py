import pytz

from datetime import datetime, timedelta

from ...db import get_game_times


def get_stats_line_graph():
    game_times = get_game_times()

    limit = datetime.now().astimezone(pytz.utc) - timedelta(days=2)
    curr = datetime.now().astimezone(pytz.utc).replace(
        minute=0, second=0, microsecond=0)

    time_count = []

    while curr > limit:
        time_query = game_times.aggregate([
            {
                '$match': {
                    'sessionEnd': {'$gte': curr, '$lt': curr + timedelta(hours=1)}
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
                    '_id': 0,
                    'y': '$count'
                }
            }
        ])

        line_graph = list(time_query)

        if len(line_graph) > 0:
            time_count.append({ 'y': line_graph[0]['y'], 't': curr.isoformat() })
        else:
            time_count.append({ 'y': 0, 't': curr.isoformat() })

        curr = curr - timedelta(hours=1)

    return time_count
