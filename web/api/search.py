from flask import Blueprint, jsonify, request, Response
from ..db import get_lurker_collection
from bson.json_util import dumps

api_search_bp = Blueprint(
    'api-search', __name__, url_prefix='/api/search')


def map_user_to_semantic_ui(item):
    ret = dict()

    ret['title'] = item['username'] + '#' + item['discriminator']
    ret['url'] = '/user/' + item['userId']

    return ret


@api_search_bp.route('/names', methods=['GET'])
def get_usernames():
    name_query = request.args['user']

    coll = get_lurker_collection()
    users = coll.discord_db_user.find({'username': name_query})

    semantic_ui = [map_user_to_semantic_ui(i) for i in users]

    return jsonify(semantic_ui)
