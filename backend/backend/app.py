from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "AI Code Review Assistant Backend Running"

@app.route("/review", methods=["POST"])
def review_code():
    data = request.get_json()

    code = data.get("code", "")

    return jsonify({
        "code_received": code,
        "message": "Code review completed"
    })

if __name__ == "__main__":
    app.run(debug=True)