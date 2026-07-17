import { useState } from "react";

function Login({ setPage }: { setPage: (page: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", username);

        alert("✅ Login Successful");

        setPage("dashboard");
      } else {
        alert(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#dbeafe,#bae6fd,#7dd3fc,#ffffff)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "35px",
          borderRadius: "20px",
          width: "400px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
          }}
        >
          🔐 Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={loginUser}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Login 🚀
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: "#475569",
          }}
        >
          Don't have an account?
        </p>

        <button
          onClick={() => setPage("register")}
          style={{
            width: "100%",
            padding: "12px",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Create New Account
        </button>
      </div>
    </div>
  );
}

export default Login;