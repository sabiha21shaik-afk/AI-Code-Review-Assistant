function Home({ setPage }: { setPage: (page: string) => void }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(135deg, #e0f7ff 0%, #bae6fd 35%, #7dd3fc 70%, #ffffff 100%)",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Heading */}
      <h1
        style={{
          fontSize: "58px",
          marginTop: "70px",
          color: "#1e3a8a",
          fontWeight: "800",
          letterSpacing: "1px",
        }}
      >
        🤖 AI Code Review Assistant
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "24px",
          marginTop: "25px",
          color: "#334155",
          lineHeight: "1.7",
        }}
      >
        🚀 Analyze your code automatically with AI
        <br />
        Find bugs, improve quality and get smart suggestions.
      </p>

      {/* Feature Cards */}
      <div
        style={{
          marginTop: "70px",
          display: "flex",
          justifyContent: "center",
          gap: "35px",
          flexWrap: "wrap",
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            width: "270px",
            padding: "35px",
            borderRadius: "22px",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 12px 30px rgba(59,130,246,0.20)",
            transition: "0.3s",
            cursor: "pointer",
          }}
        >
          <div style={{ fontSize: "55px" }}>🧠</div>

          <h2
            style={{
              color: "#1e3a8a",
              marginTop: "20px",
            }}
          >
            AI Analysis
          </h2>

          <p
            style={{
              color: "#475569",
              fontSize: "17px",
            }}
          >
            Smart code suggestions with intelligent bug detection.
          </p>
        </div>

        {/* Card 2 */}
        <div
          style={{
            width: "270px",
            padding: "35px",
            borderRadius: "22px",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 12px 30px rgba(59,130,246,0.20)",
            transition: "0.3s",
            cursor: "pointer",
          }}
        >
          <div style={{ fontSize: "55px" }}>📊</div>

          <h2
            style={{
              color: "#1e3a8a",
              marginTop: "20px",
            }}
          >
            Code Score
          </h2>

          <p
            style={{
              color: "#475569",
              fontSize: "17px",
            }}
          >
            Evaluate your code quality with an AI-generated score.
          </p>
        </div>

        {/* Card 3 */}
        <div
          style={{
            width: "270px",
            padding: "35px",
            borderRadius: "22px",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 12px 30px rgba(59,130,246,0.20)",
            transition: "0.3s",
            cursor: "pointer",
          }}
        >
          <div style={{ fontSize: "55px" }}>📄</div>

          <h2
            style={{
              color: "#1e3a8a",
              marginTop: "20px",
            }}
          >
            PDF Reports
          </h2>

          <p
            style={{
              color: "#475569",
              fontSize: "17px",
            }}
          >
            Download complete review reports with suggestions.
          </p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => setPage("login")}
        style={{
          marginTop: "70px",
          padding: "18px 45px",
          border: "none",
          borderRadius: "50px",
          fontSize: "20px",
          fontWeight: "700",
          cursor: "pointer",
          color: "white",
          background:
            "linear-gradient(90deg,#38bdf8,#3b82f6,#2563eb)",
          boxShadow: "0 12px 25px rgba(37,99,235,0.35)",
          transition: "0.3s",
        }}
      >
        🚀 Get Started
      </button>
    </div>
  );
}

export default Home;