function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        width: "220px",
        borderRadius: "15px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
      }}
    >
      <h3>{title}</h3>
      <h1 style={{ color: "#7c3aed" }}>{value}</h1>
    </div>
  );
}

export default DashboardCard;