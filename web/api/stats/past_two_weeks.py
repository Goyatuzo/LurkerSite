from datetime import datetime, timedelta

from ...db import get_game_times


def get_past_two_weeks(user_id: str, game_name: str, details: str):
    game_times = get_game_times()

    time_query = game_times.aggregate([
        {
            '$match': {
                'userId': user_id,
                'gameName': game_name,
                'sessionEnd': {'$gte': datetime.now() - timedelta(days=14)}
            }
        },
        {
            '$group': {
                '_id': {
                    'gameName': "$gameName",
                    'detail': f"${details}"
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
                'name': '$_id.detail',
                'time': '$time'
            }
        }
    ])

    bar_graph = list(time_query)
    names = [time['gameName'] for time in bar_graph]

    return bar_graph, names
