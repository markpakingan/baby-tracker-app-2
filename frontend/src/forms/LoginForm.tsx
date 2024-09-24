import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the props type
interface LogInFormProps {
  setToken: (token: string) => void;
}

const LogInForm: React.FC<LogInFormProps> = ({ setToken }) => {

  const initialState = {
    username: "",
    password: ""
  };

  const BACKEND_URL = "http://localhost:3000";
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, formData);
      const token = response.data.access_token;
      const userId = response.data.userId;

      localStorage.setItem("token", token);
      localStorage.setItem("username", formData.username);
      localStorage.setItem("userId", userId);

      // Set token and navigate to dashboard
      setToken(token);
      setFormData(initialState);
      alert("Login Authenticated!");

      navigate("/dashboard");

      console.log({
        status: "Ok",
        message: "Login successful",
        data: response,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="website-title">The Bath App</h1>
      <div className="logo"></div>
      <h2>Baby Tracker App</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username"></label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          id="password"
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button>Log In</button>
      </form>

      <a href="/signup">
        New User? Click The Sign Up
      </a>
    </div>
  );
};

export default LogInForm;
