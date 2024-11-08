import React, { useEffect } from "react";
import image from "../../assets/startup.jpg";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";


const Startup = () => {
  const navigate = useNavigate()
  const id = localStorage.getItem("id")
  useEffect(() => {
    if(id){
      navigate("/splashLoading") 
    }
  },[])
  return <div className="flex">
      <div className="w-[30%] h-[100vh] bg-[#cdd4d3] flex flex-col justify-center">
        <div>
          <img src={logo} className="my-5" />
        </div>
        <h2 className="ms-7 text-3xl font-bold text-[#394040]">
          Log in to your account
        </h2>
        ;<p className="ms-7 my-3  text-lg text-[#394040]">
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </p>
        <div className="flex flex-col justify-center items-center gap-5">
          <button onClick={() => navigate("/signup")} className="w-[350px] h-[50px] rounded-lg border text-white font-bold text-xl tracking-widest bg-[#232829] hover:bg-[#566464] transition-all duration-300">
            Sign up
          </button>
          <button onClick={() => navigate("/login")} className="w-[350px] h-[50px] rounded-lg border text-white font-bold text-xl tracking-widest bg-[#232829] hover:bg-[#566464] transition-all duration-300">
            Log in
          </button>
        </div>
      </div>
      <div className="w-[70%] h-[100vh] bg-[#232829] justify-center items-center flex flex-col ">
        <div className="rounded-lg flex ms-5 my-5 justify-center">
          <img src={image} className="rounded-lg w-[70%]" alt="" />
        </div>
        <div className="ms-5 ">
          <h3 className="text-[#cdd4d3] text-3xl text-center">
            Welcome To Your Personal Budget Manager
          </h3>
        </div>
      </div>
    </div>;
};

export default Startup;
