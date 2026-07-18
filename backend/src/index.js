import express from "express";
import axios from "axios";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ================== ✅ MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

// ================== ✅ MONGODB CONNECT ==================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.log("❌ DB Error:", err.message));

// ================== ✅ USER SCHEMA ==================
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// ================== 🔐 SIGNUP API ==================
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "User registered successfully ✅" });

  } catch (error) {
    console.log("Signup Error:", error.message);
    res.status(500).json({ error: "Signup failed" });
  }
});

// ================== 🔐 LOGIN API ==================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log("Login Error:", error.message);
    res.status(500).json({ error: "Login failed" });
  }
});

// ================== 🔍 JOBS API ==================
app.get("/jobs", async (req, res) => {
  const search = req.query.search || "developer";

  try {
    const [res1, res2, res3] = await Promise.all([

      // 🌍 Remotive
      axios.get("https://remotive.com/api/remote-jobs"),

      // 🌍 Arbeitnow
      axios.get("https://www.arbeitnow.com/api/job-board-api"),

      // 🇮🇳 JSearch
      axios.get("https://jsearch.p.rapidapi.com/search", {
        params: {
          query: `${search} jobs in india`,
          page: "1",
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }),
    ]);

    // 🌍 Remotive normalize
    const remotiveJobs = res1.data.jobs.map((job) => ({
      title: job.title,
      company: job.company_name,
      url: job.url,
      type: job.job_type,
      source: "Remotive 🌍",
    }));

    // 🌍 Arbeitnow normalize
    const arbeitJobs = res2.data.data.map((job) => ({
      title: job.title,
      company: job.company_name,
      url: job.url,
      type: job.job_types?.[0] || "N/A",
      source: "Arbeitnow 🌍",
    }));

    // 🇮🇳 JSearch normalize
    const indiaJobs = res3.data.data.map((job) => ({
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city || "India",
      url: job.job_apply_link,
      type: job.job_employment_type || "N/A",
      source: "India 🇮🇳",
    }));

    // 🔥 merge
    let jobs = [...indiaJobs, ...remotiveJobs, ...arbeitJobs];

    // 🔍 filter
    jobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase())
    );

    console.log("🔥 Total jobs:", jobs.length);

    res.json(jobs);

  } catch (error) {
    console.log("❌ ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// ================== 🚀 SERVER ==================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});