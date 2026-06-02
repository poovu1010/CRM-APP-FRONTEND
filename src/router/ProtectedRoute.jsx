import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

export default function ProtectedRoute({ children }) {
  const [isAuth, setAuth] = useState(null);

  useEffect(() => {
    async function isVerified() {
      try {
        console.log("isverifed")
        const res = await api.post("/Owner/Verify", {}, { withCredentials: true });
        console.log(res)
        setAuth(true);
      } catch (error) {
        console.log("VERIFY FAILED:", error.response?.status);
        setAuth(false);
      }
    }

    isVerified();
  }, []);

  if (isAuth === null) {
    return <h1>Loading...</h1>;
  }

  if (isAuth === false) {
    console.log(false)
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}