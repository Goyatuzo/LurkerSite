from flask import render_template
from flask import Blueprint
from datetime import datetime, timedelta

from ..db import get_game_times

game_bp = Blueprint(
    'game', __name__, template_folder='templates', url_prefix='/game')


@game_bp.route('/<game_name>')
def stats_by_game_name(game_name: str):
    return render_template('game_stats.html', game_name=game_name)
