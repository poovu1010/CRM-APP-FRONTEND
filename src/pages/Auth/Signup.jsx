import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "../../assets/logo.png";
import axios from "axios";
import api from "../../api/axios";

const Signup = () => {
  const [show, toShow] = useState(false);

  const [input, setInput] = useState({
    Email: "",
    Password: "",
  });

  function handleInputfun(e) {
    const inputValue = e.target.value;
    const inputName = e.target.name;

    setInput((prevs) => {
      return { ...prevs, [inputName]: inputValue };
    });
  }

  const navigate = useNavigate()
  async function submit(e) {
    try {
      e.preventDefault();
     

      const res = await api.post(
        // "http://3.220.158.94:5000/Owner/login",
        "/Owner/login",
        {
          email: input.Email,
          password: input.Password,
        },

        { withCredentials: true },

      );
      console.log(res);
      toast.success(res.data.message);
      if(res.status == 200){
        
      navigate("/dashboard");

      }
      
    
    } catch (error) {
      console.log(error)
         console.log(error.response.data);
         toast.error(error.response.data.message)
    }

    
  }

  return (
    <div className="px-10  flex justify-center w-full">
      <div className=" w-full max-w-md bg-white md:max-w-150  flex flex-col rounded-3xl">
        {/* Header - Logo Section */}
        <div className="flex flex-col pt-6 items-center">
          <img
            src={logo}
            alt="logo"
            className="w-40 h-40 object-cover scale-125"
          />
          <h1 className="text-2xl font-medium text-purple-600">
            Fit the world
          </h1>
        </div>

        {/* Main Form Section - Centers vertically */}
        <div className="flex-1 flex flex-col justify-center px-5">
          <h1 className="font-bold text-2xl text-center">Welcome Back!</h1>
          <p className="text-gray-700 text-sm text-center mt-2">
            Login to Your Account!
          </p>

          <form className="flex flex-col gap-4 mt-8">
            {/* Email or phone */}
            <div className="flex flex-col gap-1">
              <label htmlFor="EmailorPhone" className="text-sm font-medium">
                Email
              </label>
              <input
                type="text"
                name="Email"
                value={input.email}
                onChange={handleInputfun}
                id="EmailorPhone"
                className="border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
                placeholder="Enter email or phone"
              />
              <p className="text-xs text-red-500 hidden">Error message</p>
            </div>

            {/* password */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="Password" className="text-sm font-medium">
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                id="Password"
                name="Password"
                value={input.password}
                onChange={handleInputfun}
                className="border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
                placeholder={show ? ".........." : "Enter the password"}
              />
              <button
                type="button"
                onClick={() => toShow(!show)}
                alt="eye"
                className="absolute right-2 top-1/2 "
              >
                {show ? "👁️" : "👁️‍🗨️"}
              </button>

              <p className="text-xs text-red-500 hidden">Error message</p>
            </div>

            {/* Forget Password */}
            <div className="flex justify-end">
              <p className="text-sm text-purple-600 cursor-pointer">
                Forgot Password?
              </p>
            </div>

            {/* Login Button */}
            <button
              onClick={submit}
              type="submit"
              className="bg-purple-600 text-white py-3 rounded-lg font-medium mt-4 hover:bg-purple-700 transition"
            >
              Login
            </button>
          </form>
        </div>

        {/* Footer - Sign Up Link */}
        <div className="p-5 pb-8 text-center">
          <p className="text-gray-600">
            Don't have an account?
            <span className="text-purple-600 font-medium ml-1 cursor-pointer">
              <Link to={"/auth"}> Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
