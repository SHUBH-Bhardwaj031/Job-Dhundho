import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import JobCard from "../components/JobCard";
import { API_URL } from "../config";

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [hasSearched, setHasSearched] = useState(false);

  const fetchJobs = async () => {
    if (!search.trim()) return;

    try {
      setLoading(true);
        setHasSearched(true); 

      const res = await axios.get(
        `${API_URL}/jobs?search=${search}`
      );

      setJobs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 ENTER KEY
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchJobs();
    }
  };

  // 🔥 FILTER LOGIC
  const filteredJobs = jobs.filter((job) => {
    // location filter
    const locationMatch =
      locationFilter === "all" ||
      (locationFilter === "india" &&
        job.source?.toLowerCase().includes("india")) ||
      (locationFilter === "remote" &&
        !job.source?.toLowerCase().includes("india"));

    // job type filter
    const typeMatch =
      typeFilter === "all" ||
      job.type?.toLowerCase().includes(typeFilter);

    return locationMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-black relative overflow-hidden text-gray-100">

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>

      <Header />

      <div className="relative z-10">

        {/* 🔥 Search */}
        <div className="flex flex-col items-center text-center px-4 py-16">
          <h1 className="text-4xl font-bold">
            Find Your <span className="text-indigo-400">Dream Job</span>
          </h1>

          <div className="mt-6 w-full max-w-xl flex bg-white/10 backdrop-blur border border-white/20 rounded-xl overflow-hidden">

            <input
              type="search"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 bg-transparent outline-none text-white"
            />

            <button
              onClick={fetchJobs}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 font-medium flex items-center justify-center min-w-[100px]"
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </div>

          {/* 🔥 FILTERS */}
          <div className="flex flex-col items-center mt-6 gap-4">

            {/* Location */}
            <div className="flex gap-3 flex-wrap justify-center">
              {["all", "india", "remote"].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocationFilter(loc)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    locationFilter === loc
                      ? "bg-indigo-600 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  {loc === "all"
                    ? "All"
                    : loc === "india"
                    ? "🇮🇳 India"
                    : "🌍 Remote"}
                </button>
              ))}
            </div>

            {/* Type */}
            <div className="flex gap-3 flex-wrap justify-center">
              {["all", "full", "part", "contract"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    typeFilter === type
                      ? "bg-purple-600 text-white"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  {type === "all"
                    ? "All Types"
                    : type === "full"
                    ? "Full-Time"
                    : type === "part"
                    ? "Part-Time"
                    : "Contract"}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* 🔥 JOB LIST */}
        <div className="px-6 pb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {/* Skeleton */}
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-5 animate-pulse"
              >
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-600 rounded"></div>
              </div>
            ))}

          {/* Real Data */}
          {!loading && filteredJobs.length > 0 &&
            filteredJobs.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}

          {/* Empty */}
          {!loading && hasSearched && filteredJobs.length === 0 && (
            <p className="text-center text-gray-400 col-span-full">
              No jobs match your filters ❌
            </p>
          )}

        </div>

      </div>
    </div>
  );
}