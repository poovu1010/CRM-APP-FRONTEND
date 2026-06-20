import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "../../assets/logo.png";
import axios from "axios";
import api from "../../api/axios";
import { Loader2 } from "lucide-react";
import { g, h1 } from "framer-motion/client";

const Signup = () => {
  const [show, toShow] = useState(false);
  const [cliked, setclicked] = useState(false)

  const [loginDialoge, setLognDialoge] = useState(false)
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });


  async function verifyOtp(e) {
    e.preventDefault();

    try {
      setOtpLoading(true);
      

      const res = await api.post("/Owner/Verify-otp", {
        email: input.email,
        otp: otp,
      });

      toast.success(res.data.message);
      navigate("/dashboard");
      setLognDialoge(true)
      setInput({
        email: "",
        password: "",
      })
      
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
      setLognDialoge(true)
    } finally {
      
      setOtpLoading(false);

    }
  }

  function handleInputfun(e) {
    const inputValue = e.target.value;
    const inputName = e.target.name;

    setInput((prevs) => {
      return { ...prevs, [inputName]: inputValue };
    });
  }

  const navigate = useNavigate()


  async function login_function(e) {
    try {
      e.preventDefault();
      setclicked(true)
    // Login API
      const res = await api.post(

        // "http://3.220.158.94:5000/Owner/login",
        "/Owner/login",
        {
          email: input.email,
          password: input.password,
        },

        { withCredentials: true },

      );
      console.log(res);
      toast.success(res.data.message);
      if (res.status == 200) {
        setLognDialoge(true)

      }
      setLognDialoge(true)
      setclicked(false)


    } catch (error) {
      console.log(error)
      setclicked(false)

      if (error.response) {
        return toast.error(error.response.data.message)
      }

      toast.error("Your network is problem")

    }finally{
      setOtp("")
    }


  }

  return (
    <div className="px-10  flex justify-center w-full">
      <div className=" w-full max-w-80 bg-white md:max-w-100  flex flex-col rounded-3xl">
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

          {loginDialoge ? (
            <form className="flex flex-col gap-4 mt-8" onSubmit={verifyOtp}>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">OTP Verification</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Enter the OTP sent to your email
                </p>
              </div>



              {/* OTP */}
              <div className="flex flex-col gap-1">
                <label htmlFor="otp" className="text-sm font-medium">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className="border border-gray-300 rounded-lg p-3 tracking-[8px] text-center text-lg font-semibold focus:border-purple-500 focus:outline-none"
                  placeholder="------"
                />
              </div>

              {/* Send OTP */}
              {/* <button
                type="button"
                
                disabled={otpLoading}
                className={`bg-gray-100 text-purple-600 py-3 rounded-lg font-medium hover:bg-gray-200 transition ${otpLoading && "cursor-not-allowed opacity-70"
                  }`}
              >
                Send OTP
              </button> */}

              {/* Verify OTP */}
              <button
                type="submit"
                onClick={verifyOtp}
                disabled={otpLoading}
                className={`bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition ${otpLoading && "cursor-not-allowed opacity-70"
                  }`}
              >
                <span className="flex justify-center items-center gap-3">
                  Verify OTP {otpLoading && <Loader2 className="animate-spin" size={18} />}
                </span>
              </button>

              <p className="text-center text-sm">Send otp again? <span onClick={login_function} className="text-sm text-violet-400">send</span></p>

              {/* Back to login */}
              <p
                onClick={() => setLognDialoge(false)}
                className="text-sm text-center text-purple-600 cursor-pointer"
              >
                Back to Login
              </p>
            </form>
          ) : (
            <form className="flex flex-col gap-4 mt-8" onSubmit={login_function}>
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="EmailorPhone" className="text-sm font-medium">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={handleInputfun}
                  id="EmailorPhone"
                  className="border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
                  placeholder="Enter email"
                />
                <p className="text-xs text-red-500 hidden">Error message</p>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1 relative">
                <label htmlFor="Password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  type={show ? "text" : "password"}
                  id="Password"
                  name="password"
                  value={input.password}
                  onChange={handleInputfun}
                  className="border border-gray-300 rounded-lg p-3 focus:border-purple-500 focus:outline-none"
                  placeholder={show ? ".........." : "Enter the password"}
                />

                <button
                  type="button"
                  onClick={() => toShow(!show)}
                  className="absolute right-2 top-1/2"
                >
                  {show ? "👁️" : "👁️‍🗨️"}
                </button>

                <p className="text-xs text-red-500 hidden">Error message</p>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <p
                  onClick={() => setLoginDialoge(true)}
                  className="text-sm text-purple-600 cursor-pointer"
                >
                  Forgot Password?
                </p>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={cliked}
                className={`bg-purple-600 text-white py-3 rounded-lg font-medium mt-4 hover:bg-purple-700 transition ${cliked && "cursor-not-allowed opacity-70"
                  }`}
              >
                <span className="flex justify-center items-center gap-3">
                  Login {cliked && <Loader2 className="animate-spin" size={18} />}
                </span>
              </button>
            </form>
          )}
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
