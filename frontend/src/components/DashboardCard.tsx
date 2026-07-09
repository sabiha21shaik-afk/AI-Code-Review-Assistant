type DashboardCardProps = {
  title: string;
  value: string;
};

function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        margin: "10px",
        width: "200px",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default DashboardCard;