import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png';
import TextField from '@mui/material/TextField';
import Loading from './../../components/loading';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (key, val) => {
    setData((prevData) => ({
      ...prevData,
      [key]: val,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/login/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      setLoading(false);
      console.log(response)
      toast.success("login Success!");
      localStorage.setItem('id', JSON.stringify(response.data.user.user.id))
      navigate("/splashLoading");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error(error.response)
        toast.error(error.response.data.error || "Login failed failed!");
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
      <ToastContainer position="bottom-right" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md px-8 py-6 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <div className="flex justify-center">
              <img src={logo} alt="Logo" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#232829]">
              Login to Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us to manage your finances with ease
            </p>
          </div>
          <form className="mt-8 space-y-2" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="py-1">
                <TextField
                  type="email"
                  label="Email Address"
                  variant="filled"
                  color="success"
                  className="w-full"
                  required
                  onChange={(e) => handleChange("email", e.target.value)}
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
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </div>
            </div>
            <div>
              {loading ? (
                <button
                  type="submit"
                  className="w-full flex justify-center py-1 px-4 border-transparent rounded-md text-white bg-[#2bb44a] hover:bg-[#2bb44b83] transition-all duration-300"
                  aria-label="Loading"
                >
                  <Loading />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2bb44a] hover:bg-[#2bb44b83] focus:outline-none transition-all duration-300"
                  aria-label="Login"
                >
                  Login
                </button>
              )}
            </div>
          </form>
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account yet?{' '}
            <Link
              to="/signup"
              className="text-[#2bb44a] hover:text-[#2bb44b75] font-medium transition-all duration-300"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
