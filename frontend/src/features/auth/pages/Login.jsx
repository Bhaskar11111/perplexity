import React, { useState } from "react";
import AuthCard from "../components/AuthCard";
import useAuth from '../hooks/useAuth.js'
import { Navigate, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const fields = [
  {
    name: "identifier",
    type: "text",
    placeholder: "Email or username",
    autoComplete: "username",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "current-password",
  },
];

const Login = () => {

  const user=useSelector((state)=>state.auth.user)
  const loading=useSelector((state)=>state.auth.loading)

  const {handleLogin}=useAuth()
  const navigate=useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = async(e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(formData);

    try{
      await handleLogin(formData.identifier,formData.password)
    navigate('/')
  }
  catch(err){
    console.error(err)
  }

  if(user){

    return <Navigate to='/' replace/> 
  }
    
  };

  return (
    <AuthCard
      mode="login"
      title="Welcome back"
      subtitle="Don't have an account?"
      fields={fields}
      formData={formData}
      showPassword={showPassword}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onTogglePassword={() => setShowPassword((value) => !value)}
    />
  );
};

export default Login;
