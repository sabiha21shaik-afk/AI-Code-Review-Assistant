import { useEffect, useState } from "react";

function History() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/history")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg,#dbeafe,#ddd6fe,#fbcfe8)",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ color: "#6d28d9" }}>
          📜 Review History
        </h1>

        {history.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              style={{
                marginTop: "20px",
                padding: "20px",
                background: "#eef2ff",
                borderRadius: "12px",
              }}
            >
              <p><b>📄 File:</b> {item.filename}</p>
              <p><b>⭐ Score:</b> {item.score}/10</p>
              <p><b>📅 Reviewed:</b> {item.reviewed_at}</p>

              <h3>💡 Suggestions</h3>

              <ul>
                {item.suggestions.map((s: string, index: number) => (
                  <li key={index}>{s}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;