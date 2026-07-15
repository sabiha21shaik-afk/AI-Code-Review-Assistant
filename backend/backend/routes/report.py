from flask import Blueprint, send_file
from models import ReviewHistory
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
import tempfile
import os

report_bp = Blueprint("report", __name__)


@report_bp.route("/report/<int:review_id>", methods=["GET"])
def generate_report(review_id):

    review = ReviewHistory.query.get(review_id)

    if not review:
        return {"error": "Review not found"}, 404

    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".pdf")
    filename = temp.name
    temp.close()

    doc = SimpleDocTemplate(filename)
    styles = getSampleStyleSheet()

    story = []

    story.append(Paragraph("<b>AI Code Review Report</b>", styles["Heading1"]))
    story.append(Paragraph(f"<b>Filename:</b> {review.filename}", styles["BodyText"]))
    story.append(Paragraph(f"<b>Score:</b> {review.score}/10", styles["BodyText"]))
    story.append(Paragraph(f"<b>Reviewed At:</b> {review.reviewed_at}", styles["BodyText"]))
    story.append(Paragraph("<br/><b>Suggestions:</b>", styles["Heading2"]))

    for suggestion in review.suggestions.split("\n"):
        story.append(Paragraph(f"• {suggestion}", styles["BodyText"]))

    doc.build(story)

    return send_file(
        filename,
        as_attachment=True,
        download_name=f"{review.filename}_report.pdf"
    )