import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {toast} from "react-toastify"
import axios from "axios";
import { API_URL } from "../config";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass,setShowPass]=useState(false)

  const handleSignup = async (e) => {
  e.preventDefault();

  // 🔥 validation
  if (!name || !email || !password) {
    toast.error("All fields are required ❌");
    return;
  }

  try {
    const res = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password,
    });

    toast.success(res.data.message);

    navigate("/login");

  } catch (error) {
    toast.error(error.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="min-h-screen flex bg-black relative overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* LEFT */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative z-10 px-20">
        <div>
          <h1 className="text-5xl font-bold text-white leading-tight">
            Start Your  
            <br />
            <span className="text-indigo-400">Career Journey</span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-md text-lg">
            Join thousands of users finding their dream jobs faster.
          </p>

          <div className="mt-10 h-px w-40 bg-gradient-to-r from-indigo-500 to-transparent"></div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full lg:w-1/2 items-center justify-center z-10 px-6">

        <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(99,102,241,0.2)]">

          <h2 className="text-2xl font-semibold text-gray-100 text-center">
            Create Account
          </h2>

          <p className="text-center text-gray-300 text-sm mt-2">
            Sign up to continue
          </p>

          {/* Form */}
          <form onSubmit={handleSignup} className="mt-8 space-y-5">

            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
      <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
<button type="button" onClick={()=>{setShowPass(!showPass)}} className="absolute right-1 top-0.5 bottom-0 text-xl " > 
  {showPass ? '🙈' : '👁'}
</button>
</div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium"
            >
              Sign Up →
            </button>

          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}