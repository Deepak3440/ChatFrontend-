import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OTPVerification({ setOtpVerified }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const generateOTP = async () => {
    try {
      const response = await axios.post("/api/auth/generateOTP", { email }); 
      console.log(response.data.message); 
    } catch (error) {
      console.error("Error generating OTP:", error);
    
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post("/api/auth/verifyOTP", { email, otp }); 
      console.log(response.data.message); 
      if (response.status === 200) {
        setOtpVerified(true);
        toast.success("OTP verified successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          setOtpVerified(true);
          navigate("/");
        }, 1000); 
      } else {
        setError("Invalid OTP. Please try again.");
        toast.error("Invalid OTP. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Error verifying OTP. Please try again.");
      toast.error("Error verifying OTP. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleResendOTP = async () => {
    try {
      await axios.post("/api/auth/generateOTP", { email }); 
      toast.success("OTP resent successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Error resending OTP. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg'>
        <h2 className='text-3xl font-semibold text-center text-green-300'>OTP Verification</h2>

        <form className='mt-4' onSubmit={(e) => e.preventDefault()}>
          <div className='mb-4'>
            <label htmlFor='email' className='label p-2'>
              <span className='text-base label-text text-black'>Email:</span>
            </label>
            <input
              type='email'
              id='email'
              required
              className='w-full input input-bordered h-10'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className='btn btn-sm mt-2' onClick={generateOTP}>
            Generate OTP
          </button>

          <div className='mt-4'>
            <label htmlFor='otp' className='label'>
              <span className='text-base label-text text-black'>Enter OTP:</span>
            </label>
            <input
              type='text'
              id='otp'
              required
              className='w-full input input-bordered h-10'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          {error && <div style={{ color: "red" }}>{error}</div>}

          <button className='btn btn-sm mt-4' onClick={handleVerifyOTP}>
            Verify OTP
          </button>


          <p className='mt-2 text-black'>
            Haven't received OTP? <button className='btn btn-sm mt-4' onClick={handleResendOTP}>
            Resend OTP
        
          </button>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default OTPVerification;
