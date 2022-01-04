import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../components/login/LoginForm";


function Login(){

  const loggedin = useSelector((state) => state.user.value.isLoggedIn);

  if (!loggedin){
    return (
      <LoginForm />
    );
  }

  else{
    return <Navigate to="/" />;
  }
}

export default Login;