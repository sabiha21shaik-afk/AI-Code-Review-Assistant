import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import History from "./pages/History";

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
    </>
  );
}

export default App;