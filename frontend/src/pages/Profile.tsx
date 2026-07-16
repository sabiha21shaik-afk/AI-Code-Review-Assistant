import Sidebar from "../components/Sidebar";

function Profile({
  setPage,
}: {
  setPage: (page: string) => void;
}) {
  const username = localStorage.getItem("username") || "Guest";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    alert("Logged out successfully!");

    setPage("dashboard");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setPage={setPage} />

      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          padding: "40px",
          background:
            "linear-gradient(135deg,#dbeafe,#ddd6fe,#fbcfe8)",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "auto",
            background: "white",
            padding: "35px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
        >
          <h1
            style={{
              color: "#6d28d9",
              textAlign: "center",
            }}
          >
            👤 User Profile
          </h1>

          <hr />

          <p style={{ fontSize: "20px" }}>
            <b>Username:</b> {username}
          </p>

          <p style={{ fontSize: "18px" }}>
            <b>Status:</b> Logged In ✅
          </p>

          <button
            onClick={logout}
            style={{
              marginTop: "30px",
              width: "100%",
              padding: "12px",
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;