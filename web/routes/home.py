from flask import render_template
from flask import Blueprint

from ..db import get_game_times

home_bp = Blueprint(
    'home', __name__, template_folder='templates', url_prefix='/')


@home_bp.route('/')
def home():
    game_times = get_game_times()

    game_times = game_times.aggregate([
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
        }, {
            '$sort': {
                'time': -1
            }
        }
    ])

    listify = list(game_times)
    names = [time['_id']['gameName'] for time in listify]

    print(names)

    return render_template('home.html', games=names, times=listify)
