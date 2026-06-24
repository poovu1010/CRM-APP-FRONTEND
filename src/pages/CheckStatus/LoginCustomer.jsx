import React, { useState } from 'react'
import BGimgLarge from '../../assets/bgimgCustomerLG.png'
import BGimgSmall from '../../assets/bgimgcustomerSM.png'
import { Lock } from 'lucide-react'
import { pre } from 'framer-motion/client'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export default function LoginCustomer() {


    const Navigate = useNavigate()


    const [loginInfo, setLoginInfo] = useState({
        email: "",
        otp: ""
    })
    const [errors, setErrors] = useState({
        email: "",
        otp: "",
    });


    const [EmailView, SetEmailView] = useState(true)




    function validateField(name, value) {
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!value.trim()) return "Email is required";
            if (!emailRegex.test(value)) return "Enter a valid email";
        }

        if (name === "otp") {
            if (!value.trim()) return "OTP is required";
            if (value.length !== 6) return "OTP must be 6 digits";
        }

        return "";
    }

    async function handleSendOtp() {

        try {

            const error = validateField("email", loginInfo.email);

            if (error) {
                setErrors((prev) => ({
                    ...prev,
                    email: error,
                }));
                return;
            }

            const sendemail = await api.post("/Order-check/login", { email: loginInfo.email })
            toast.success(sendemail.data.message)

            SetEmailView(false);


        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }






    }

    async function handleLogin() {

        try {
        
            const error = validateField("otp", loginInfo.otp);

            if (error) {
                setErrors((prev) => ({
                    ...prev,
                    otp: error,
                }));

                return;
            }



            const sendemail = await api.post("/Order-check/Verify-Otp", { email: loginInfo.email, otp: loginInfo.otp })
            

            if (sendemail.data.status) {
                  toast.success(sendemail.data.message)

            Navigate("/Order-status/Info-status")
                
            }

          



        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }

    }

    return (
        <div className=' relative h-screen w-full'>
            {/* bg-img */}
            <div className='inset absolute h-full w-full'>
                <img src={BGimgLarge} alt="" className='hidden md:block object-cover h-full ' />
                <img src={BGimgSmall} alt="" className='md:hidden object-cover h-full w-full ' />
            </div>


            {/* login box */}
            <div className='relative  w-full flex justify-center items-center h-full min-w-0 px-5 '>

                <div className=' w-md min-w-0  bg-amber-50 px-4 rounded-2xl shadow-2xl py-5 flex flex-col gap-7'>

                    {/* Bold text */}

                    <div className='flex flex-col place-items-center'>
                        <h2 className='text-2xl  font-serif font-bold text-amber-950'>
                            Welcome Back
                        </h2>
                        <p className=' font-serif font-bold text-amber-800'>
                            Login to continue your journey with us
                        </p>
                    </div>


                    <div className='flex gap-2 flex-col place-items-center'>
                        <p className=' font-serif font-bold text-gray-600 text-lg'>Email Login</p>
                        <div className='h-[1px] w-full bg-black'>
                        </div>
                    </div>



                    {/* form */}
                    {EmailView ? <EmailForm Email={loginInfo.email} SetEmail={setLoginInfo} onclick={handleSendOtp} Error={errors.email} /> : <OtpForm OTP={loginInfo.otp} SetOtp={setLoginInfo} onclick={handleLogin} Error={errors.otp} />}







                    <div className='flex justify-center gap-3'>
                        <Lock size={20} className='text-amber-800' />
                        <p className='text-gray-700'>Your Data is Secure</p>

                    </div>

                </div>

            </div>


        </div>
    )
}

function EmailForm({ Email, SetEmail, onclick, Error }) {

    return (
        <div className='px-4 min-w-0 flex flex-col gap-5'>
            <div className='min-w-0 w-full'>
                <p>
                    Email
                </p>
                <input value={Email} onChange={(e) => SetEmail((prevs) => ({
                    ...prevs,
                    email: e.target.value
                }))} type="text" placeholder='Example@gmail.com' className='border rounded-lg w-10/11 mt-2 ml-2 h-10 px-4 ' />

                <div className='h-3 text-xs text-red-500 vibrate'>
                    {Error}

                </div>

            </div>

            <button onClick={onclick} className='bg-amber-900  w-10/11 ml-2 text-white rounded-lg h-11 min-w-0 truncate'>
                Send OTP
            </button>

            {/* otp check */}

        </div>
    )
}

function OtpForm({ OTP, SetOtp, onclick, Error }) {

    return (

        <div className='px-4 min-w-0 flex flex-col gap-5'>
            <div className='min-w-0 w-full'>
                <p>
                    Enter the OTP
                </p>
                <input value={OTP} onChange={(e) => SetOtp((prevs) => ({ ...prevs, otp: e.target.value }))} type="text" placeholder='--- ---' className='border rounded-lg w-10/11 mt-2 ml-2 h-10  text-center  ' />

                <p className='h-3 text-red-500 text-xs'>
                    {Error}
                </p>

            </div>

            <button onClick={onclick} className='bg-amber-900  w-10/11 ml-2 text-white rounded-lg h-11 min-w-0 truncate'>
                Login
            </button>

        </div>
    )
}


