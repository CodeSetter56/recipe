import React, { useState } from 'react';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Auth(){
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Login />
        </div>
        <div className="col-md-6">
          <Register />
        </div>
      </div>
    </div>
  );
}

export default Auth;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", { username, password });
      alert("Registered successfully");
    } catch (error) {
      setError(error.response ? error.response.data.message : "Registration failed");
      console.error(error);
    }
  };

  return (
    <Form
      title="Register"
      {...{ username, setUsername, password, setPassword, handleSubmit }}
      error={error}
    />
  );
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [_, setCookie] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:3000/auth/login", { username, password });
  
        if (response.status === 200 && response.data.token && response.data.UserId) {
          setCookie("access_token", response.data.token);
          window.localStorage.setItem("userId", response.data.UserId);
          navigate("/"); 
        } else {
          setError("Login failed");
        }
      } catch (error) {
        setError(error.response ? error.response.data.message : "Invalid credentials");
        console.error(error);
      }
    };
  
    return (
      <Form
        title="Login"
        {...{ username, setUsername, password, setPassword, handleSubmit }}
        error={error}
      />
    );
  };

const Form = ({ title, username, setUsername, password, setPassword, handleSubmit, error }) => {
  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};