import { useEffect, useState } from "react";
import Header from "../components/Header";
import JobCard from "../components/JobCard";

export default function SaveJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(data);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>

      <Header />

      <div className="relative z-10 px-6 py-20">

        <h1 className="text-3xl font-bold text-center mb-10">
          ❤️ Saved Jobs
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {savedJobs.length > 0 ? (
            savedJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">
              No saved jobs yet ❌
            </p>
          )}

        </div>

      </div>
    </div>
  );
}