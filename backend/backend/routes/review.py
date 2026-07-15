from flask import Blueprint, request, jsonify
import os

from models import db, ReviewHistory

review_bp = Blueprint("review", __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "..", "uploads")


@review_bp.route("/review", methods=["POST"])
def review_code():
    data = request.get_json()

    filename = data.get("filename", "")

    if not filename:
        return jsonify({
            "error": "No filename provided"
        }), 400

    filepath = os.path.join(UPLOAD_FOLDER, filename)

    if not os.path.exists(filepath):
        return jsonify({
            "error": "File not found"
        }), 404

    try:
        with open(filepath, "r", encoding="utf-8") as file:
            code = file.read()
    except UnicodeDecodeError:
        return jsonify({
            "error": "Only text-based source code files (.py, .js, .java, .cpp, .html, .css, etc.) can be reviewed."
        }), 400
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

    suggestions = []
    score = 10

    # Code quality checks
    if "print(" in code:
        suggestions.append("Consider replacing print() statements with proper logging.")
        score -= 1

    if len(code.splitlines()) > 100:
        suggestions.append("The file is quite long. Consider splitting it into smaller functions.")
        score -= 1

    if "#" not in code:
        suggestions.append("Add comments to improve readability.")
        score -= 1

    if "TODO" in code:
        suggestions.append("Complete or remove TODO comments before deployment.")
        score -= 1

    if "pass" in code:
        suggestions.append("Found unfinished code using 'pass'.")
        score -= 1

    if "except:" in code:
        suggestions.append("Avoid using bare except statements.")
        score -= 1

    if "eval(" in code:
        suggestions.append("Avoid using eval() because it can be unsafe.")
        score -= 2

    if "global " in code:
        suggestions.append("Avoid excessive use of global variables.")
        score -= 1

    if len(code.strip()) == 0:
        suggestions.append("The uploaded file is empty.")
        score = 0

    score = max(score, 0)

    if len(suggestions) == 0:
        suggestions.append("Excellent! No major issues found.")

    review = ReviewHistory(
        filename=filename,
        score=score,
        suggestions="\n".join(suggestions)
    )

    db.session.add(review)
    db.session.commit()

    return jsonify({
        "message": "Code review completed successfully",
        "filename": filename,
        "score": f"{score}/10",
        "lines": len(code.splitlines()),
        "characters": len(code),
        "suggestions": suggestions
    })


@review_bp.route("/history", methods=["GET"])
def review_history():

    reviews = ReviewHistory.query.order_by(
        ReviewHistory.reviewed_at.desc()
    ).all()

    history = []

    for review in reviews:
        history.append({
            "id": review.id,
            "filename": review.filename,
            "score": review.score,
            "suggestions": review.suggestions.split("\n"),
            "reviewed_at": review.reviewed_at.strftime("%d-%m-%Y %H:%M")
        })

    return jsonify(history)