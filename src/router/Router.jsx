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
import CustomerDetails from "../pages/CustomerDetails";
import CustomerDetailLayout from "../Layout/CustomerDetailLayot";
import OrderPageLayout from "../Layout/OrderPageLayout";
import OrderDetail from "../pages/OrderDetail";
import OrderDetailLayout from "../Layout/OrderDetailLayout";
import DashBoardData from "../pages/DashBoardData";
import LoginCustomer from "../pages/CheckStatus/LoginCustomer";
import CheckStatus from "../pages/CheckStatus/CheckStatus";

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
{/* <Route path="Customers/:name/:id" element={<CustomerDetails/>}/> */}


        <Route path="/dashboard" element={<ProtectedRoute><ContentLayout/></ProtectedRoute> }>
          <Route index element={<DashBoardData/>} />
          <Route path="CustomerPage" element={<CustomerPage/>}/>
          <Route path="me" element={<ProfilePage/>}></Route>
         
        </Route>

        <Route path="/Customers" element={<CustomerDetailLayout/>}>
        <Route path=":name/:id" element={<CustomerDetails/>}/>
        </Route>


         <Route path="/Orders" element={<OrderPageLayout/>}>
            <Route path="all-orders" element={<OrdersPage/>}/>
          </Route>
          

          <Route path="/Orders" element={<OrderDetailLayout/>}>
          <Route path="all-orders/:name/:id" element={<OrderDetail/>}/>
          </Route>

          {/* check Order Stauslogin */}

          <Route path="/Order-status/Login" element={<LoginCustomer/>} />

          {/* orderstatus Dashboard checkin */}
          <Route path="/Order-status/Info-status" element={<CheckStatus/>} />

          

           
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
