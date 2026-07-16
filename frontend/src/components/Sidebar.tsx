import { useState } from "react";

function Sidebar({ setPage }: { setPage: (page: string) => void }) {
  const [active, setActive] = useState("dashboard");

  const menuItem = (
    key: string,
    icon: string,
    label: string
  ) => (
    <li
      onClick={() => {
        setActive(key);
        setPage(key);
      }}
      style={{
        marginBottom: "12px",
        padding: "12px 15px",
        borderRadius: "10px",
        cursor: "pointer",
        background:
          active === key ? "#4f46e5" : "transparent",
        transition: "0.3s",
        fontSize: "16px",
        fontWeight: active === key ? "bold" : "normal",
      }}
      onMouseEnter={(e) => {
        if (active !== key) {
          e.currentTarget.style.background = "#374151";
        }
      }}
      onMouseLeave={(e) => {
        if (active !== key) {
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      {icon} {label}
    </li>
  );

  return (
    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: "25px",
        boxShadow: "5px 0 15px rgba(0,0,0,0.15)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#60a5fa",
        }}
      >
        🤖 AI Reviewer
      </h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {menuItem("dashboard", "🏠", "Dashboard")}
        {menuItem("upload", "📂", "Upload Code")}
        {menuItem("history", "📜", "Review History")}
        {menuItem("statistics", "📈", "Statistics")}
        {menuItem("login", "🔐", "Login")}
        {menuItem("profile", "👤", "Profile")}
      </ul>
    </div>
  );
}

export default Sidebar;