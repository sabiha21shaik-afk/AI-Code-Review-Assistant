import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";

function Dashboard({
  setPage,
}: {
  setPage: (page: string) => void;
}) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar setPage={setPage} />

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
            }}
          >
            🤖 AI Code Review Assistant
          </h1>

          <p style={{ fontSize: "20px" }}>
            Welcome 👋
          </p>

          <div
            style={{
              display: "flex",
              gap: "25px",
              marginTop: "30px",
              flexWrap: "wrap",
            }}
          >
            <DashboardCard
              title="📄 Total Reviews"
              value="0"
            />

            <DashboardCard
              title="📂 Projects"
              value="0"
            />

            <DashboardCard
              title="🛡️ Security Issues"
              value="0"
            />
          </div>

          <div
            style={{
              marginTop: "40px",
              background: "white",
              padding: "25px",
              borderRadius: "15px",
            }}
          >
            <h2>📋 Recent Reviews</h2>
            <p>No reviews available.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;