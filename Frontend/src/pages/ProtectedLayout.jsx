// src/layouts/ProtectedLayout.jsx
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProtectedLayout() {
  const location = useLocation();
  const isAuth = localStorage.getItem("auth") === "true";

//   if (!isAuth) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

  return (
    <>
      <Navbar />
      {/* Padding-top so content is not under navbar */}
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
}
