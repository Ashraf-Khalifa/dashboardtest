import React from "react";
import "../assets/css/Login.css"
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
    const navigate=useNavigate()
    const handleSubmit=()=>{
navigate('/admin/dashboard')
    }
  return (
    <div className="container">

    <div id="login-form">
      <h1>Login</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <input type="submit" value="Submit" onClick={handleSubmit}/>
      </form>
    </div>
        </div>

  );
};

export default LoginForm;
