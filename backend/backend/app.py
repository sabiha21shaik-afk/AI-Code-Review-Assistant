from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token
)

from models import db, bcrypt, User

from routes.upload import upload_bp
from routes.review import review_bp
from routes.stats import stats_bp
from routes.report import report_bp

app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}})

# Database Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# JWT Configuration
app.config["JWT_SECRET_KEY"] = "mysecretkey"

db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(upload_bp)
app.register_blueprint(review_bp)
app.register_blueprint(stats_bp)
app.register_blueprint(report_bp)


@app.route("/")
def home():
    return "AI Code Review Assistant Backend Running"


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