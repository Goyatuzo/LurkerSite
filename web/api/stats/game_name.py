
from datetime import datetime, timedelta

from ...db import get_game_times


def hours_sum_past_year(game_name: str):
    game_collection = get_game_times()

    now = datetime.now()
    last_year = now.replace(year=now.year - 1)
    times = game_collection.aggregate([
        {
            '$match': {
                'gameName': game_name,
                'sessionEnd': {'$gte': last_year}
            },
        },
        {
            '$group': {
                '_id': {
                    'year': {'$year': '$sessionEnd'},
                    'month': {'$month': '$sessionEnd'}
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
            '$project': {
                '_id': 0,
                'date': {'$dateFromParts': {'year': '$_id.year', 'month': '$_id.month'}},
                'time': '$time'
            }
        },
        {
            '$sort': {
                'date': 1
            }
        }
    ])

    result = list(times)

    curr = 0
    for idx, date in enumerate(past_year_range()):
        # Grab the next date in the result array
        compare_date = result[curr]['date']

        print(f'ENTRY: {compare_date}; DATE: {date}')

        if date.year == compare_date.year and date.month == compare_date.month:
            # If the month matches, go to the next one in the results list
            curr += 1
        else:
            result.append({'date': date, 'time': 0})

    result = sorted(result, key=lambda item: item['date'])
    return result


def past_year_range():
    """Returns a range of 12 datetime objects ending at the current month of last year."""
    base = datetime.now() - timedelta(weeks=52)

    # Iterate from 0 to 14 because numerically 14 months have passed from last year
    for n in range(14):
        yield (base + timedelta(weeks=4 * n)).replace(day=1, hour=0, minute=0, second=0)
