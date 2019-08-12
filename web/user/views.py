from flask import render_template

from . import user_bp


@user_bp.route('/<user_id>')
def get_user_graph(user_id):
    return render_template('user-info.html')
