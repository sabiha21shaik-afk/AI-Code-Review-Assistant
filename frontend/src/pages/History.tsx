import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

interface Review {
  id: number;
  filename: string;
  score: number;
  suggestions: string | string[];
  reviewed_at: string;
}

function History({
  setPage,
}: {
  setPage: (page: string) => void;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/history")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.log(err));
  }, []);

  const totalReviews = reviews.length;

  const averageScore =
    totalReviews === 0
      ? 0
      : (
          reviews.reduce((sum, review) => sum + review.score, 0) /
          totalReviews
        ).toFixed(1);

  const bestScore =
    totalReviews === 0
      ? 0
      : Math.max(...reviews.map((review) => review.score));

  const downloadReport = (id: number) => {
    window.open(`http://127.0.0.1:5000/report/${id}`, "_blank");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setPage={setPage} />

      <div
        style={{
          flex: 1,
          padding: "35px",
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#dbeafe,#bae6fd,#7dd3fc,#ffffff)",
        }}
      >
        <style>
          {`
          .card{
            transition:.3s;
          }

          .card:hover{
            transform:translateY(-6px);
            box-shadow:0 15px 35px rgba(0,0,0,.15);
          }

          .button:hover{
            transform:scale(1.05);
          }
          `}
        </style>

        <h1
          style={{
            color: "#1e3a8a",
            textAlign: "center",
            fontSize: "38px",
            marginBottom: "35px",
          }}
        >
          📜 AI Review History
        </h1>

        <div
          style={{
            display: "flex",
            gap: "25px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          <div
            className="card"
            style={{
              background: "#bfdbfe",
              padding: "25px",
              borderRadius: "20px",
              width: "220px",
              textAlign: "center",
            }}
          >
            <h2>📂</h2>
            <h3>Total Reviews</h3>
            <h1>{totalReviews}</h1>
          </div>

          <div
            className="card"
            style={{
              background: "#bbf7d0",
              padding: "25px",
              borderRadius: "20px",
              width: "220px",
              textAlign: "center",
            }}
          >
            <h2>⭐</h2>
            <h3>Average Score</h3>
            <h1>{averageScore}/10</h1>
          </div>

          <div
            className="card"
            style={{
              background: "#fde68a",
              padding: "25px",
              borderRadius: "20px",
              width: "220px",
              textAlign: "center",
            }}
          >
            <h2>🏆</h2>
            <h3>Best Score</h3>
            <h1>{bestScore}/10</h1>
          </div>
        </div>

        {reviews.length === 0 ? (
          <h2 style={{ textAlign: "center" }}>😔 No reviews found</h2>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="card"
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "20px",
                marginBottom: "25px",
                boxShadow: "0 10px 25px rgba(0,0,0,.1)",
              }}
            >
              <h2>📄 {review.filename}</h2>

              <p>
                <b>⭐ Score:</b> {review.score}/10
              </p>

              <p>
                <b>🕒 Reviewed:</b> {review.reviewed_at}
              </p>

              <h3>💡 Suggestions</h3>

              <ul>
                {Array.isArray(review.suggestions)
                  ? review.suggestions.map((item, index) => (
                      <li key={index}>✅ {item}</li>
                    ))
                  : review.suggestions
                      .split("\n")
                      .map((item, index) => (
                        <li key={index}>✅ {item}</li>
                      ))}
              </ul>

              <button
                className="button"
                onClick={() => downloadReport(review.id)}
                style={{
                  marginTop: "20px",
                  padding: "12px 22px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#2563eb",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "15px",
                }}
              >
                📄 Download PDF Report
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
