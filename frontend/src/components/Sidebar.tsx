function Sidebar() {
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
        <li style={{ margin: "15px 0" }}>🏠 Dashboard</li>
        <li style={{ margin: "15px 0" }}>📂 Upload Code</li>
        <li style={{ margin: "15px 0" }}>📊 Reports</li>
        <li style={{ margin: "15px 0" }}>👤 Profile</li>
      </ul>
    </div>
  );
}

export default Sidebar;