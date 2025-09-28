import React, { useState , useContext }from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { login} from "../../api/auth"; 
import { AuthStatus } from "../context";


function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthStatus);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting},
      } = useForm();

      const onSubmit = async (data) => {
        try {
          const res = await login(data.email, data.password); // save response
          console.log("Login success:", res.data);
          alert("Login successful!");
          setIsAuthenticated(true);
          navigate("/dashboard");

        } catch (error) {

          console.error("Login failed:", error.response?.data?.message);
          const e = error.response?.data?.message;
          setIsAuthenticated(false);
          if(e == "User not found"){
            navigate("/signup");
          }
          alert(error.response?.data?.message || "Login failed. Please try again.");
        }
      };
      
        
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <input
             {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // basic email regex
                  message: "Enter a valid email address",
                },
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
                   {...register("password", {
                    required: "Password is required",
                    maxLength:{value:8,message:'Enter maximum 8 char'}
                  })}
              type="password"
              placeholder="Enter your password"
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
          </div>
          {isSubmitting ? "Submitting..." : "Login"}
          <button
  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
  type="submit"
  disabled={isSubmitting}
>
  {isSubmitting ? "Submitting..." : "Login"}
</button>
        </form>
       
        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          {/* <a href="/Signup" className="text-blue-600 hover:underline">
            Sign Up
          </a> */}
          <Link to="/signup" className="text-blue-600 hover:underline">
          Sign Up  
          </Link>
        </p>
      </div>
    </div>
</>
  );
}

export default Login;
