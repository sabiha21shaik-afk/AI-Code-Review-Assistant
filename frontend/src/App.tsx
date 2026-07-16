import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import History from "./pages/History";
import Statistics from "./pages/Statistics";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <>
      {page === "dashboard" && (
        <Dashboard setPage={setPage} />
      )}

      {page === "upload" && (
        <Upload />
      )}

      {page === "history" && (
        <History />
      )}

      {page === "statistics" && (
        <Statistics setPage={setPage} />
      )}

      {page === "login" && (
        <Login />
      )}

      {page === "profile" && (
        <Profile setPage={setPage} />
      )}
    </>
  );
}

export default App;