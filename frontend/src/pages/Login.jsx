import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPass,setShowPass]=useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!loginData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!loginData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", loginData);

      // ✅ success
      toast.success("Login successful ✅");

      // user store (basic auth)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // redirect
      navigate("/browsejobs");

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ❌");
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
            Find Jobs  
            <br />
            <span className="text-indigo-400">That Actually Matter</span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-md text-lg">
            Discover curated opportunities that fit your skills.
          </p>

          <div className="mt-10 h-px w-40 bg-gradient-to-r from-indigo-500 to-transparent"></div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full lg:w-1/2 items-center justify-center relative z-10 px-6">

        <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(99,102,241,0.2)]">

          <h2 className="text-2xl font-semibold text-gray-100 text-center">
            Welcome Back
          </h2>

          <p className="text-center text-gray-300 text-sm mt-2">
            Login to continue
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
      <div className="relative">
            <input
              type= {showPass ? 'text' : 'password'}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <button type="button" className="absolute right-1 top-0 bottom-1 text-xl" onClick={()=>{setShowPass(!showPass)}}>
                {showPass ? '🙈' : '👁'}
            </button>
</div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium"
            >
              Login →
            </button>

          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}