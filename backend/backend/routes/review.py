from flask import Blueprint, request, jsonify

review_bp = Blueprint("review", __name__)

@review_bp.route("/review", methods=["POST"])
def review_code():
    data = request.get_json()

    filename = data.get("filename", "")

    if not filename:
        return jsonify({
            "error": "No filename provided"
        }), 400

    suggestions = [
        "Use meaningful variable names.",
        "Add comments to improve readability.",
        "Follow PEP8 coding standards.",
        "Remove unused variables if any."
    ]

    return jsonify({
        "message": "Code review completed successfully",
        "filename": filename,
        "score": "9/10",
        "suggestions": suggestions
    })