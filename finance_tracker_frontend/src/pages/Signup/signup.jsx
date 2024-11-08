import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loading from './../../components/loading';
import { toast, ToastContainer } from 'react-toastify';


const Signup = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    profileimage: null,
  });

  const fillData = (key, val) => {
    setData((prevData) => ({
      ...prevData,
      [key]: val,
    }));
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('profileimage', data.profileimage);
    try {
      setloading(true);
      await axios.post("http://localhost:8000/api/signup/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setloading(false);
      toast.success("Signup Success!");
      navigate("/login");
    } catch (error) {
      setloading(false);
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(error.response.data.message || "Signup failed!");
      } else if (error.request) {
        // Request was made but no response received
        toast.error("Network error, please try again later.");
      } else {
        // Something else happened
        toast.error("An unexpected error occurred.");
      }
    }


  };
  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <ToastContainer position='bottom-right' />
        <div className="w-full max-w-md px-8 py-6 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <div className="flex justify-center">
              <img src={logo} alt="Logo" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#232829]">
              Create an Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us to manage your finances with ease
            </p>
          </div>
          <form className="mt-8 space-y-2" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="py-1">
                <TextField
                  type="text"
                  label="Username"
                  variant="filled"
                  color="success"
                  className="w-full"
                  required
                  onChange={(e) => fillData("username", e.target.value)}
                />
              </div>
              <div className="py-1">
                <TextField
                  type="email"
                  label="Email Address"
                  variant="filled"
                  color="success"
                  className="w-full"
                  required
                  onChange={(e) => fillData("email", e.target.value)}
                />
              </div>
              <div className="py-1">
                <TextField
                  type="password"
                  label="Password"
                  variant="filled"
                  color="success"
                  className="w-full"
                  required
                  onChange={(e) => fillData("password", e.target.value)}
                />
              </div>
              <div>
                <input
                  type="file"
                  className="py-3 ps-3 border-b w-full mt-2 bg-gray-100"
                  onChange={(e) =>
                    fillData("profileimage", e.target.files[0])
                  }
                />
              </div>
            </div>
            <div>
              {loading ? <button
                type="submit"
                className="w-full flex justify-center py-1 px-4 border-transparent rounded-md text-white bg-[#2bb44a] hover:bg-[#2bb44b83] transition-all duration-300"
              >
                <Loading />
              </button> : <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2bb44a] hover:bg-[#2bb44b83] focus:outline-none transition-all duration-300"
              >
                Sign Up
              </button>}

            </div>
          </form>
          <p className=" text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-[#2bb44a] hover:text-[#2bb44b75] font-medium transition-all duration-300"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
