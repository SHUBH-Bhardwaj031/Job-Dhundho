import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";

function Layout() {
  const location = useLocation();

  // ❌ jin pages par header nahi chahiye
  const hideHeaderRoutes = ["/login", "/signup"];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <div>
      <ToastContainer />

      {/* ✅ Conditional Header */}
      {!shouldHideHeader && <Header />}

      <div className={!shouldHideHeader ? "pt-16" : ""}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;