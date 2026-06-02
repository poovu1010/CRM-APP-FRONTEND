import { useContext } from "react";
import Register from "./pages/Auth/Register";
import Signup from "./pages/Auth/Signup";
import Router from "./router/Router";
import Demo from "./pages/Demo";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import ContentLayout from "./Layout/ContentLayout";

function App() {
  return (
    <>
      <Router />
      {/* <DashboardStats/> */}
      {/* <ContentLayout/> */}
      {/* <Demo/> */}
      <ToastContainer autoClose={2000} position="bottom-right" />
    </>
  );
}

export default App;
