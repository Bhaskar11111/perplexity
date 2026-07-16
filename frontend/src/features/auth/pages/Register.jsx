import React, { useState } from "react";
import AuthCard from "../components/AuthCard";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { useToast } from "../../../app/Toast";
import { getAuthErrorMessage } from "../utils/getAuthErrorMessage";

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
  const {showToast}=useToast()
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
    const toastId=showToast("Signing up...", "loading")
    
    try{
      await handleRegister(formData.username,formData.email,formData.password)
      showToast("Account created", "success", {id:toastId})
      navigate('/')
    }
    catch(err){
      showToast(getAuthErrorMessage(err), "error", {id:toastId})
      console.error(err)
    }
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
