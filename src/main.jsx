import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthDetails, { UserDetails } from "./context/AuthContext";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <UserDetails>
    <App />
  </UserDetails>,
);
