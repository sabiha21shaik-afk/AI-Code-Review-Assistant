from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token
)
from models import db, bcrypt, User

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# JWT Configuration
app.config["JWT_SECRET_KEY"] = "mysecretkey"

db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)


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


# Register User
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    new_user = User(
        username=username,
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"})


# Login User
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=username)

        return jsonify({
            "message": "Login successful",
            "access_token": access_token
        })

    return jsonify({"message": "Invalid username or password"}), 401


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(debug=True)