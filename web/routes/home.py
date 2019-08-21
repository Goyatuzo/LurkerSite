from flask import render_template
from flask import Blueprint
from datetime import datetime, timedelta

from ..db import get_game_times

home_bp = Blueprint(
    'home', __name__, template_folder='templates', url_prefix='/')


@home_bp.route('/')
def home():
    game_times = get_game_times()

    game_times = game_times.aggregate([
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

    listify = list(game_times)
    names = [time['_id']['gameName'] for time in listify]

    return render_template('home.html', games=names, times=listify)
