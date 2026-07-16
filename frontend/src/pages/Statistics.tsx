import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Statistics({
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

  const chartData = {
    labels: [
      "Total Reviews",
      "Average Score",
      "Highest Score",
      "Lowest Score",
    ],
    datasets: [
      {
        label: "Statistics",
        data: [
          stats.total_reviews,
          stats.average_score,
          stats.highest_score,
          stats.lowest_score,
        ],
        backgroundColor: [
          "#3B82F6",
          "#8B5CF6",
          "#22C55E",
          "#EF4444",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setPage={setPage} />

      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          padding: "30px",
          background:
            "linear-gradient(135deg,#dbeafe,#bfdbfe,#ddd6fe)",
        }}
      >
        <h1
          style={{
            color: "#6d28d9",
            fontSize: "40px",
          }}
        >
          📈 Review Statistics
        </h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
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
            boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
          }}
        >
          <h2>📊 Statistics Chart</h2>

          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}

export default Statistics;