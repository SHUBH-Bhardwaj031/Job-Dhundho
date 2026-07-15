import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          {/* 🔥 Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-items-center shadow">
              💼
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">
                Job Dhundho
              </div>
              <div className="text-xs text-gray-500 hidden sm:block">
                Find smarter, Get better
              </div>
            </div>
          </Link>

          {/* 🔥 Menu */}
          <nav className="hidden md:flex items-center gap-2">

            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition"
            >
              Home
            </Link>

            <Link
              to="/browsejobs"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition"
            >
              Browse Jobs
            </Link>

            <Link
              to="/savejobs"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition"
            >
              Saved Jobs
            </Link>

          </nav>

          {/* 🔥 PROFILE DROPDOWN */}
          <div className="relative">

            {/* Icon */}
            <CgProfile
              size={30}
              className="cursor-pointer text-gray-800 hover:text-indigo-600 transition"
              onClick={() => setOpen(!open)}
            />

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">

                <p className="text-sm font-semibold text-gray-800">
                  {user?.name || "Guest"}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {user?.email || "Not logged in"}
                </p>

                <div className="h-px bg-gray-200 my-3"></div>

                {/* Profile Page */}
                <Link
                  to="/profile"
                  className="block text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
                >
                  View Profile
                </Link>
                <Link
                  to="/myapplication"
                  className="block text-sm text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
                >
                 My Application
                </Link>

                {/* Logout */}
                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                  className="w-full text-left text-sm text-red-500 hover:bg-gray-100 px-2 py-1 rounded mt-2"
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}