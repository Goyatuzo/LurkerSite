from flask import render_template
from flask import Blueprint

home_bp = Blueprint(
    'home', __name__, template_folder='templates', url_prefix='/')


@home_bp.route('/')
def home():
    return render_template('home.html')
