from flask import Blueprint, jsonify, request, Response
import re
from ..db import get_game_times

api_game_time_bp = Blueprint(
    'api-game-time', __name__, url_prefix='/api/time')


@api_game_time_bp.route('/feed/<user_id>', methods=['GET'])
def get_feed(user_id: str):
    """Get a feed of the past 5 games played."""

    game_times = get_game_times()

    return jsonify({})
