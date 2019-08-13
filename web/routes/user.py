from flask import Blueprint, render_template


user_bp = Blueprint(
    'user', __name__, template_folder='templates', url_prefix='/user')


@user_bp.route('/<user_id>')
def get_user_graph(user_id):
    return render_template('user-time.html')
