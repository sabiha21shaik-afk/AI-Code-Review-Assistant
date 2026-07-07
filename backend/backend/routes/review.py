from flask import Blueprint, request, jsonify

review_bp = Blueprint("review", __name__)

@review_bp.route("/review", methods=["POST"])
def review_code():
    data = request.get_json()

    code = data.get("code", "")

    if not code:
        return jsonify({
            "error": "No code provided"
        }), 400

    return jsonify({
        "message": "Code review completed",
        "code_received": code
    })