import { useState } from "react";

function Upload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "http://127.0.0.1:5000/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    alert(data.message);
  };

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #dbeafe, #ddd6fe)",
      }}
    >
      <h1
        style={{
          color: "#6d28d9",
          fontSize: "40px",
        }}
      >
        📂 Upload Code
      </h1>

      <p>
        Upload your code files for AI review.
      </p>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          width: "400px",
          marginTop: "30px",
        }}
      >
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
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Upload
        </button>

        {file && (
          <p>
            Selected: {file.name}
          </p>
        )}
      </div>
    </div>
  );
}

export default Upload;