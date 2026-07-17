import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import History from "./pages/History";
import Statistics from "./pages/Statistics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const protectedPages = [
      "dashboard",
      "upload",
      "history",
      "statistics",
      "profile",
    ];

    if (!token && protectedPages.includes(page)) {
      setPage("login");
    }
  }, [page]);

  return (
    <>
      {page === "home" && <Home setPage={setPage} />}

      {page === "login" && <Login setPage={setPage} />}

      {page === "register" && <Register setPage={setPage} />}

      {page === "dashboard" && <Dashboard setPage={setPage} />}

      {page === "upload" && <Upload setPage={setPage} />}

      {page === "history" && <History setPage={setPage} />}

      {page === "statistics" && <Statistics setPage={setPage} />}

      {page === "profile" && <Profile setPage={setPage} />}
    </>
  );
}

export default App;