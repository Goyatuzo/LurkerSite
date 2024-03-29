from flask import Blueprint, jsonify, request, Response
import re
from ..db import get_lurker_database

api_search_bp = Blueprint(
    'api-search', __name__, url_prefix='/api/search')


def map_user_to_semantic_ui(item):
    ret = dict()

    ret['title'] = item['username'] + '#' + item['discriminator']
    ret['url'] = '/user/' + item['userId']

    return ret


@api_search_bp.route('/names', methods=['GET'])
def get_usernames():
    """Get a list of usernames that contain the string specified in the user query string."""
    name_query = request.args['user']

    coll = get_lurker_database()

    rexp = re.compile(re.escape(name_query), re.IGNORECASE)

    users = coll.discord_db_user.find({'username': rexp})

    semantic_ui = [map_user_to_semantic_ui(i) for i in users]

    return jsonify({'results': semantic_ui})
