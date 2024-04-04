import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });

      if (res.data) {
        toast.success("User Login Successfully");
        // Navigate to some page after successful login
      } else {
        // Assuming you have a toast library initialized, toast error message
        toast.error("Error in user creation");
      }
      navigate("/dashboard");
    } catch (error) {
      // Assuming you have a toast library initialized, toast error message
      toast.error("Something Went Wrong");
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <form onSubmit={handleSubmit}>
          {" "}
          {/* Wrap the inputs with form */}
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email Address"
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <Toaster />
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account? Please{" "}
          <Link to="/signup" className="text-blue-600">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Signup;
