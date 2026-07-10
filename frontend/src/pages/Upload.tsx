import { useState, useEffect } from "react";

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [review, setReview] = useState<any>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const loadFiles = async () => {
    const response = await fetch("http://127.0.0.1:5000/files");
    const data = await response.json();
    setFiles(data);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    alert(data.message);

    loadFiles();
    setFile(null);
  };

  const reviewFile = async (filename: string) => {
    const response = await fetch("http://127.0.0.1:5000/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: filename,
      }),
    });

    const data = await response.json();
    setReview(data);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(135deg,#dbeafe,#ddd6fe,#fbcfe8)",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
          background: "white",
          padding: "35px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#6d28d9",
          }}
        >
          🤖 AI Code Review Assistant
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
          }}
        >
          Upload your code and get instant AI suggestions.
        </p>

        <hr />

        <h2>📂 Upload Code</h2>

        <input
          type="file"
          onChange={handleFileChange}
        />

        <br />
        <br />

        <button
          onClick={handleUpload}
          style={{
            padding: "10px 25px",
            background: "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          🚀 Upload File
        </button>

        {file && (
          <p>
            <b>Selected:</b> {file.name}
          </p>
        )}

        <hr />

        <h2>📁 Uploaded Files</h2>

        {files.length === 0 ? (
          <p>No files uploaded.</p>
        ) : (
          files.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                padding: "12px",
                background: "#f8fafc",
                borderRadius: "10px",
              }}
            >
              <span>📄 {item}</span>

              <button
                onClick={() => reviewFile(item)}
                style={{
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ✨ Review
              </button>
            </div>
          ))
        )}

        {review && (
          <>
            <hr />

            <h2>🤖 AI Review Result</h2>

            <p>
              <b>File:</b> {review.filename}
            </p>

            <p>
              <b>Status:</b> {review.message}
            </p>

            <p>
              ⭐ <b>AI Score:</b> {review.score}
            </p>

            <h3>💡 Suggestions</h3>

            <ul>
              {review.suggestions.map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Upload;