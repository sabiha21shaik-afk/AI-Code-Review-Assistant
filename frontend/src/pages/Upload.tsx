import { useState, useEffect } from "react";

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
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
    } catch (error) {
      alert("Failed to review file.");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
          maxWidth: "850px",
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

        <input type="file" onChange={handleFileChange} />

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
            fontSize: "16px",
          }}
        >
          🚀 Upload File
        </button>

        {file && (
          <p style={{ marginTop: "15px" }}>
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
                marginBottom: "12px",
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
                  fontSize: "15px",
                }}
              >
                ✨ Review
              </button>
            </div>
          ))
        )}

        {loading && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#fef3c7",
              borderRadius: "10px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#92400e",
            }}
          >
            ⏳ Reviewing your code... Please wait.
          </div>
        )}

        {review && (
          <>
            <hr />

            <div
              style={{
                background: "#eef2ff",
                padding: "20px",
                borderRadius: "15px",
                marginTop: "20px",
              }}
            >
              <h2
                style={{
                  color: "#4f46e5",
                  marginBottom: "20px",
                }}
              >
                🤖 AI Review Result
              </h2>

              <p>
                <b>📄 File:</b> {review.filename}
              </p>

              <p>
                <b>✅ Status:</b> {review.message}
              </p>

              <p>
                <b>⭐ AI Score:</b> {review.score}
              </p>

              <p>
                <b>📄 Lines:</b> {review.lines}
              </p>

              <p>
                <b>🔤 Characters:</b> {review.characters}
              </p>

              <h3 style={{ color: "#7c3aed" }}>
                💡 Suggestions
              </h3>

              <ul>
                {review.suggestions.map(
                  (item: string, index: number) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Upload;