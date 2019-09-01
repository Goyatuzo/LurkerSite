from flask import render_template
from flask import Blueprint
from datetime import datetime, timedelta

from ..db import get_game_times

home_bp = Blueprint(
    'home', __name__, template_folder='templates', url_prefix='/')


@home_bp.route('/')
def home():
    return render_template('home.html')


@home_bp.route('/stats')
def stats():
    return render_template('stats.html')
