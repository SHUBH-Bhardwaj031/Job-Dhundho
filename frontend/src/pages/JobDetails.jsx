import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";

export default function JobDetails() {
  const { state } = useLocation();
  const job = state?.job;

  if (!job) {
    return <div className="text-center mt-20">No Job Data Found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-20">

        {/* Title */}
        <h1 className="text-3xl font-bold text-white">
          {job.title}
        </h1>

        {/* Company */}
        <p className="text-gray-400 mt-2">
          {job.company}
        </p>

        {/* Tags */}
        <div className="flex gap-2 mt-4">
          <span className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded">
            {job.type}
          </span>
        </div>

        {/* Description */}
        <div className="mt-6 bg-gray-800 p-5 rounded-xl">
          <p className="text-gray-300 leading-relaxed">
            {job.description || "No description available"}
          </p>
        </div>

        {/* Apply Button */}
        <a
          href={job.url}
          target="_blank"
          className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium"
        >
          Apply Now
        </a>

      </div>
    </div>
  );
}