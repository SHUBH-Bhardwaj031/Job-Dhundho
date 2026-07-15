import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function JobCard({ job }) {

  const [saved, setSaved] = useState(false);

  // 🔥 CHECK on load (already saved or not)
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const isSaved = existing.find((item) => item.url === job.url);
    if (isSaved) setSaved(true);
  }, [job.url]);

  // 🔥 TOGGLE SAVE
  const handleSave = () => {
    let existing = JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (saved) {
      // ❌ remove
      existing = existing.filter((item) => item.url !== job.url);
      localStorage.setItem("savedJobs", JSON.stringify(existing));
      setSaved(false);
    } else {
      // ❤️ save
      existing.push(job);
      localStorage.setItem("savedJobs", JSON.stringify(existing));
      setSaved(true);
    }
  };

  return (
    <div className="bg-white/15 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between h-full">

      {/* 🔥 TOP */}
      <div>

        {/* Header */}
        <div className="flex items-start justify-between">

          {/* Source */}
          <span className="text-xs px-2 py-1 rounded-full bg-gray-300 text-gray-600">
            {job.source}
          </span>

          {/* ❤️ HEART ICON */}
          <div
            onClick={handleSave}
            className="cursor-pointer transition hover:scale-110"
          >
            {saved ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon style={{ color: "white" }} />
            )}
          </div>

        </div>

        {/* Title */}
        <h2 className="mt-4 text-lg font-semibold text-gray-100 line-clamp-2">
          {job.title}
        </h2>

        {/* Company */}
        <p className="text-gray-400 text-sm mt-1">
          {job.company}
        </p>

        {/* Divider */}
        <div className="h-px bg-white/10 my-4"></div>

        {/* Info */}
        <div className="flex flex-wrap gap-2 text-xs">

          <span className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md">
            {job.type || "N/A"}
          </span>

          {job.location && (
            <span className="bg-white/10 text-gray-300 px-2 py-1 rounded-md">
              📍 {job.location}
            </span>
          )}

        </div>

      </div>

      {/* 🔥 APPLY */}
      <div className="mt-6">
        <a
          href={job.url}
          target="_blank"
          rel="noreferrer"
          className="block w-full text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-lg text-sm font-medium"
        >
          Apply Now →
        </a>
      </div>

    </div>
  );
}