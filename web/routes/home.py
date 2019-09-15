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


@home_bp.route('/join')
def join():
    return render_template('join.html')


@home_bp.route('/terms')
def terms():
    return render_template('terms.html')


@home_bp.route('/privacy')
def privacy():
    return render_template('privacy.html')
