import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";

function Dashboard({
  setPage,
}: {
  setPage: (page: string) => void;
}) {
  const [stats, setStats] = useState({
    total_reviews: 0,
    average_score: 0,
    highest_score: 0,
    lowest_score: 0,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  }, []);

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
              value={stats.total_reviews.toString()}
            />

            <DashboardCard
              title="⭐ Average Score"
              value={`${stats.average_score}/10`}
            />

            <DashboardCard
              title="🟢 Highest Score"
              value={`${stats.highest_score}/10`}
            />

            <DashboardCard
              title="🔴 Lowest Score"
              value={`${stats.lowest_score}/10`}
            />
          </div>

          <div
            style={{
              marginTop: "40px",
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          >
            <h2>📊 Review Statistics</h2>

            <p>📄 Total Reviews: {stats.total_reviews}</p>
            <p>⭐ Average Score: {stats.average_score}/10</p>
            <p>🟢 Highest Score: {stats.highest_score}/10</p>
            <p>🔴 Lowest Score: {stats.lowest_score}/10</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;