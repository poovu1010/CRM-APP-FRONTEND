import React, { useContext } from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Register from "../pages/Auth/Register";
import Signup from "../pages/Auth/Signup";

import AuthDetails from "../context/AuthContext";

import ContentLayout from "../Layout/ContentLayout";
// import DashBoard from "../pages/DashBoard";
import DashboardGrid from "../pages/DashBoard";

import AuthLayout from "../Layout/AuthLayout";
import IndexPage from "../pages/IndexPage";
import CustomerPage from "../pages/CustomerPage";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import OrdersPage from "../pages/OrdersPage";

const Router = () => {
  const { authData } = useContext(AuthDetails);

  return (
    <BrowserRouter>
      <Routes>
        <Route index  element={<IndexPage/>}/>

        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Register />} />
          <Route path="login" element={<Signup />} />
        </Route>



        <Route path="/dashboard" element={<ProtectedRoute><ContentLayout /></ProtectedRoute> }>
          <Route index element={<DashboardGrid />} />
          <Route path="CustomerPage" element={<CustomerPage/>}/>
          <Route path="me" element={<ProfilePage/>}></Route>
          <Route path="all-orders" element={<OrdersPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
