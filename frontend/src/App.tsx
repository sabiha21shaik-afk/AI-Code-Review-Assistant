import { useState } from "react";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");

  const submitCode = async () => {
    const response = await fetch("http://127.0.0.1:5000/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    setReview(data.message);
  };

  return (
    <div className="container">
      <h1>AI Code Review Assistant</h1>

      <textarea
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button onClick={submitCode}>
        Review Code
      </button>

      <div className="result">
        <h2>Review Result</h2>
        <p>{review}</p>
      </div>
    </div>
  );
}

export default App;