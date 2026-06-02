import React, { useContext, useState } from "react";
import AuthDetails from "../../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Signup from "./Signup";
import axios from "axios";

import logo from "../../assets/logo.png";
import api from "../../api/axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const { authData, manageAuthData } = useContext(AuthDetails);
  const navigate = useNavigate();

  // input get
  const [input, GetInput] = useState({
    FullName: "",
    Email: "",
    Password: "",
    ConfirmPasswoed: "",
    Role: "",
  });

  const [Errors, SetErrors] = useState({
    FullName: "",
    Email: "",
    Password: "",
    ConfirmPasswoed: "",
    Role: "",
  });

  const validate = () => {
    const nameRegex = /^[A-Za-z ]{2,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    let newErrors = {};

    if (!input.FullName) {
      newErrors.FullName = "name is required";
    }
    if (!input.Email) {
      newErrors.Email = "Email is required";
    } else if (!emailRegex.test(input.Email.trim())) {
      newErrors.Email = "Enter valid Email";
    }

    // Password validation
    if (!input.Password) {
      newErrors.Password = "Password is required";
    } else if (!passwordRegex.test(input.Password)) {
      newErrors.Password =
        "At least 8 characters,1 lowercase,1 uppercase,1 number,1 special character";
    }
    if (!input.ConfirmPasswoed) {
      newErrors.ConfirmPasswoed = "Enter the Confirm password";
    } else if (input.Password != input.ConfirmPasswoed) {
      newErrors.ConfirmPasswoed = "password is miss match";
    }
    if (!input.Role) {
      newErrors.Role = "role is required";
    }

    SetErrors(newErrors);
    console.log(newErrors);
    return newErrors;
  };

  let Handleinput = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);

    let updated = { ...input, [name]: value };
    GetInput(updated);

    return updated;
  };
  // let data = JSON.stringify(input)

  async function submit(e) {
    e.preventDefault();

    let demo = validate();

    if (Object.keys(demo).length == 0) {
      // (manageAuthData({
      //   FullName: input.FullName,
      //   Email: input.Email,
      //   Password: input.Password,
      // }),

      const res = await api.post(
        "/Owner/Signup",
        {
          userName: input.FullName,
          email: input.Email,
          password: input.Password,
          role: input.Role,
        },
        { withCredentials: true },
      );
      console.log(res.data);

      await toast.success(res.data.message);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      await toast.error("Registrtion failed");
    }
  }

  return (
    <div className=" px-10  flex justify-center w-full">
      <div className=" w-full max-w-md md:max-w-150 bg-white flex flex-col rounded-3xl">
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
        {/* <p>{data}</p> */}

        <div className="flex-1 flex flex-col justify-center px-5">
          <form className="flex flex-col px-8 gap-1 mt-8">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="fullName" className="text-sm font-medium">
                UserName
              </label>
              <input
                name="FullName"
                value={input.Fullname}
                onChange={Handleinput}
                type="text"
                id="fullName"
                className="border border-gray-300 rounded-lg h-10 md:h-12 px-6 focus:border-purple-500 focus:outline-none"
                placeholder="Enter your full name"
              />
              <p className="text-red-500 text-xs h-3 place-items-center flex">
                {Errors.FullName}
              </p>
            </div>

            {/* Email or Phone */}
            <div className="flex flex-col gap-1">
              <label htmlFor="emailOrPhone" className="text-sm font-medium">
                Email or Phone
              </label>
              <input
                name="Email"
                onChange={Handleinput}
                value={input.Email}
                type="text"
                id="emailOrPhone"
                className="border border-gray-300 rounded-lg h-10 md:h-12 px-6 focus:border-purple-500 focus:outline-none"
                placeholder="Enter email or phone number"
              />
              <p className="text-red-500 text-xs h-3 place-items-center flex">
                {Errors.Email}
              </p>
            </div>

            {/* Role Selection */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-black "
              >
                Select Role
              </label>

              {/* Relative wrapper needed for the custom arrow */}
              <div className="">
                <select
                  id="role"
                  name="Role"
                  value={input?.Role || ""}
                  onChange={Handleinput}
                  // 'appearance-none' hides the default browser dropdown arrow
                  className="w-full  h-10 md:h-12 px-6  bg-gray-50 border border-gray-200 rounded-xl text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 cursor-pointer"
                >
                  {/* Default placeholder option */}
                  <option value="" disabled>
                    Select your role...
                  </option>
                  <option value="Owner">Owner</option>
                  <option value="Staff">Staff</option>
                  <option value="Tailor">Tailor</option>
                </select>

                {/* Custom Dropdown Arrow SVG */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Error Message Space */}
              <p className="text-red-500 text-xs flex items-center ">
                {Errors.Role}
              </p>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  name="Password"
                  onChange={Handleinput}
                  value={input.Password}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="border border-gray-300 rounded-lg h-10 md:h-12 px-6 w-full focus:border-purple-500 focus:outline-none pr-10"
                  placeholder="Create password"
                />
                <p className="text-red-500 text-xs h-auto place-items-center flex">
                  {Errors.Password}
                </p>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  name="ConfirmPasswoed"
                  onChange={Handleinput}
                  value={input.ConfirmPasswoed}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="border border-gray-300 rounded-lg h-10 md:h-12 px-6 mb-2 w-full focus:border-purple-500 focus:outline-none pr-10"
                  placeholder="Confirm your password"
                />
                <p className="text-red-500 text-xs h-3 place-items-center flex">
                  {Errors.ConfirmPasswoed}
                </p>

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-purple-600"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="text-purple-600">Terms of Service</span> and{" "}
                <span className="text-purple-600">Privacy Policy</span>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              onClick={submit}
              className="bg-purple-600 text-white py-3 rounded-lg font-medium mt-4 hover:bg-purple-700 transition"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Footer - Login Link */}
        <div className="p-5 pb-8 text-center">
          <p className="text-gray-600">
            Already have an account?
            <span className="text-purple-600 font-medium ml-1 cursor-pointer">
              <Link to={"/login"}> Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
