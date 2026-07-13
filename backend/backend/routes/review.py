from flask import Blueprint, request, jsonify
import os

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

    if "print(" in code:
        suggestions.append("Consider replacing print() statements with proper logging.")

    if len(code.splitlines()) > 100:
        suggestions.append("The file is quite long. Consider splitting it into smaller functions.")

    if "#" not in code:
        suggestions.append("Add comments to improve readability.")

    if "TODO" in code:
        suggestions.append("Complete or remove TODO comments before deployment.")

    if len(suggestions) == 0:
        suggestions.append("Good job! No major issues found.")

    return jsonify({
        "message": "Code review completed successfully",
        "filename": filename,
        "score": "9/10",
        "lines": len(code.splitlines()),
        "characters": len(code),
        "suggestions": suggestions
    })