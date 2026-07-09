function Navbar() {
  return (
    <nav
      style={{
        background: "linear-gradient(90deg, #2563eb, #7c3aed, #ec4899)",
        color: "white",
        padding: "18px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        🤖 AI Code Review Assistant
      </h2>

      <div
        style={{
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        Welcome 👋
      </div>
    </nav>
  );
}

export default Navbar;