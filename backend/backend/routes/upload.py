from flask import Blueprint, request, jsonify
import os

upload_bp = Blueprint("upload", __name__)

# Absolute path to uploads folder
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "..", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@upload_bp.route("/upload", methods=["POST"])
def upload_file():

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    return jsonify({
        "message": "File uploaded successfully",
        "filename": file.filename
    })


@upload_bp.route("/files", methods=["GET"])
def get_files():
    files = os.listdir(UPLOAD_FOLDER)
    return jsonify(files)