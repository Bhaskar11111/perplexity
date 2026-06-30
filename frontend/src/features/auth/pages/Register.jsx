import React, { useState } from "react";
import AuthCard from "../components/AuthCard";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

const fields = [
  {
    name: "username",
    type: "text",
    placeholder: "Username",
    autoComplete: "username",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    autoComplete: "email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    autoComplete: "new-password",
  },
];

const Register = () => {
  const {handleRegister}=useAuth()
  const navigate=useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agree: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    
    // try{
    //   await handleRegister(formData.username,formData.email,formData.password,formData.agree)
    //   navigate('/')
    // }
    // catch(err){
    //   console.error(err)
    // }
  };

  return (
    <AuthCard
      mode="register"
      title="Create an account"
      subtitle="Already have an account?"
      fields={fields}
      formData={formData}
      showPassword={showPassword}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onTogglePassword={() => setShowPassword((value) => !value)}
    />
  );
};

export default Register;
