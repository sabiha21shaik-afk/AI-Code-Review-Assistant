import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";

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
    </>
  );
}

export default App;