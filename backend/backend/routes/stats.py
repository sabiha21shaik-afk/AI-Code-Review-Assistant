from flask import Blueprint, jsonify
from sqlalchemy import func

from models import db, ReviewHistory

stats_bp = Blueprint("stats", __name__)


@stats_bp.route("/stats", methods=["GET"])
def get_stats():

    total_reviews = ReviewHistory.query.count()

    if total_reviews == 0:
        return jsonify({
            "total_reviews": 0,
            "average_score": 0,
            "highest_score": 0,
            "lowest_score": 0
        })

    average_score = db.session.query(
        func.avg(ReviewHistory.score)
    ).scalar()

    highest_score = db.session.query(
        func.max(ReviewHistory.score)
    ).scalar()

    lowest_score = db.session.query(
        func.min(ReviewHistory.score)
    ).scalar()

    return jsonify({
        "total_reviews": total_reviews,
        "average_score": round(average_score, 1),
        "highest_score": highest_score,
        "lowest_score": lowest_score
    })