import { useState } from "react";
import axios from "axios";
import { API_URL } from "./config";

function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    const res = await axios.get(
      `${API_URL}/jobs?search=${search}`
    );
    setJobs(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>💼 Job Finder</h1>

      <input
        type="text"
        placeholder="Search job..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={fetchJobs}>Search</button>

      {jobs.map((job, index) => (
        <div key={index} style={{ marginTop: "20px" }}>
          <h3>{job.title}</h3>
          <p>{job.company_name}</p>
          <a href={job.url} target="_blank">Apply</a>
        </div>
      ))}
    </div>
  );
}

export default App;