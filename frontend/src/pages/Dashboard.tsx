import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            flex: 1,
            minHeight: "100vh",
            padding: "30px",
            background:
              "linear-gradient(135deg, #dbeafe, #bfdbfe, #ddd6fe)",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              color: "#6d28d9",
              fontWeight: "bold",
              marginBottom: "30px",
              textShadow: "2px 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            🚀 Dashboard
          </h1>

          <div
            style={{
              display: "flex",
              gap: "30px",
              flexWrap: "wrap",
            }}
          >
            <DashboardCard title="📄 Total Reviews" value="0" />
            <DashboardCard title="📂 Projects" value="0" />
            <DashboardCard title="🛡️ Security Issues" value="0" />
          </div>

          <div
            style={{
              marginTop: "50px",
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
            }}
          >
            <h2
              style={{
                color: "#1e3a8a",
                marginBottom: "15px",
              }}
            >
              📋 Recent Reviews
            </h2>

            <p style={{ color: "#555" }}>
              No reviews available.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;