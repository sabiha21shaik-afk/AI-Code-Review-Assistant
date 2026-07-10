function Sidebar({ setPage }: { setPage: (page: string) => void }) {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#1f2937",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Menu</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li onClick={() => setPage("dashboard")}>
          🏠 Dashboard
        </li>

        <li onClick={() => setPage("upload")}>
          📂 Upload Code
        </li>

        <li onClick={() => setPage("reports")}>
          📊 Reports
        </li>

        <li onClick={() => setPage("profile")}>
          👤 Profile
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;