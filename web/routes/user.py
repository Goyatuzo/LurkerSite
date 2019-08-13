from flask import Blueprint, render_template
from ..db import get_lurker_collection

user_bp = Blueprint(
    'user', __name__, template_folder='templates', url_prefix='/user')


@user_bp.route('/<user_id>')
def get_user_graph(user_id):
    coll = get_lurker_collection()

    user = coll.discord_db_user.find_one({'userId': user_id})

    return render_template('user-time.html', user_info=user)
