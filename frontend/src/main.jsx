import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import JobDetails from "./pages/JobDetails.jsx";

import "./index.css";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import BrowseJobs from "./pages/BrowseJobs.jsx";
import SaveJobs from "./pages/SaveJobs.jsx";
import Profile from "./pages/Profile.jsx";
import MyApplication from "./pages/MyApplication.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Layout wrapper */}
        <Route path="/" element={<Layout />}>

          {/* Home page */}
          <Route index element={<Home />} />
         
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="browsejobs" element={<BrowseJobs/>}></Route>
            <Route path="profile" element={<Profile  />}></Route>
            <Route path="savejobs" element={<SaveJobs/>}></Route>
            <Route path="myapplication" element={<MyApplication/>}></Route>

          {/* Job details */}
          <Route path="job/:id" element={<JobDetails />} />

        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>
);