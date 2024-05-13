import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import OTPVerification from "./pages/otpVerification/OTPVerification"
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  const [otpVerified, setOtpVerified] = useState(false); // State to track OTP verification

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        {/* Route for Home page */}
        <Route
          path='/'
          element={authUser && otpVerified ? <Home /> : <Navigate to={"/login"} />}
        />
        {/* Route for Login page */}
        <Route
          path='/login'
          element={
            authUser && otpVerified ? (
              <Navigate to='/' />
            ) : (
              <Login setOtpVerified={setOtpVerified} />
            )
          }
        />
        {/* Route for OTP Verification page */}
        <Route
          path='/otp-verification'
          element={<OTPVerification setOtpVerified={setOtpVerified} />}
        />
        {/* Route for Sign Up page */}
        <Route
          path='/signup'
          element={authUser && otpVerified ? <Navigate to='/' /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
