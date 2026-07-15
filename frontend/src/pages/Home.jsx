import { Link } from "react-router-dom";
import Header from "../components/Header";
import CountUp from "../components/CountUp";

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden text-white">

      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>

      <Header />

      <div className="relative z-10 px-6">

        {/* 🔥 HERO SECTION */}
        <div className="flex flex-col items-center text-center py-24">
          <h1 className="text-5xl font-bold leading-tight">
            Find Jobs  
            <br />
            <span className="text-indigo-400">That Actually Matter</span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-xl text-lg">
            Discover curated opportunities from multiple platforms, all in one place.
          </p>

          <Link
            to="/browsejobs"
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-medium transition"
          >
            Browse Jobs →
          </Link>
        </div>

        {/* 🔥 FEATURES */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur">
            <h3 className="text-lg font-semibold">🔍 Smart Search</h3>
            <p className="text-gray-400 text-sm mt-2">
              Find jobs faster with optimized filtering and search.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur">
            <h3 className="text-lg font-semibold">🌍 Multiple Sources</h3>
            <p className="text-gray-400 text-sm mt-2">
              Jobs fetched from multiple APIs for better results.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur">
            <h3 className="text-lg font-semibold">⚡ Fast UI</h3>
            <p className="text-gray-400 text-sm mt-2">
              Clean and minimal interface for better experience.
            </p>
          </div>

        </div>

        {/* 🔥 STATS */}
        <div className="flex justify-center gap-10 mt-20 text-center">

  <div>
    <h2 className="text-3xl font-bold text-indigo-400">
      <CountUp to={300} duration={2} />+
    </h2>
    <p className="text-gray-400 text-sm">Jobs Available</p>
  </div>

  <div>
    <h2 className="text-3xl font-bold text-indigo-400">
      <CountUp to={3} duration={1.5} />
    </h2>
    <p className="text-gray-400 text-sm">APIs Integrated</p>
  </div>

  <div>
    <h2 className="text-3xl font-bold text-indigo-400">
      <CountUp to={50} duration={2} />+
    </h2>
    <p className="text-gray-400 text-sm">Companies</p>
  </div>

</div>

        {/* 🔥 QUOTE */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <p className="text-gray-400 italic text-lg">
            “Choose a job you love, and you will never have to work a day in your life.”
          </p>
        </div>

        {/* 🔥 CTA */}
        <div className="flex flex-col items-center mt-20 pb-20">
          <h2 className="text-3xl font-semibold text-center">
            Start Your Career Journey 🚀
          </h2>

          <Link
            to="/browsejobs"
            className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 rounded-lg font-medium"
          >
            Explore Jobs
          </Link>
        </div>

      </div>
    </div>
  );
}