import React, { useState } from "react";
import "../style/register.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { loading, handleRegister } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await handleRegister({ username, email, password });
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  }

  return (
    <main className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1 className="register-title">Create Account</h1>
            <p className="register-subtitle">Join us and enjoy amazing music</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {error && <div className="error-message">{error}</div>}

            <FormGroup
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />
            <FormGroup
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              label="Email Address"
              placeholder="Enter your email"
              type="email"
            />
            <FormGroup
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              label="Password"
              placeholder="Create a password"
              type="password"
            />

            <button className="register-button" type="submit">
              Create Account
            </button>
          </form>

          <div className="register-footer">
            <p className="register-text">
              Already have an account?{" "}
              <Link to="/login" className="register-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="register-decoration"></div>
      </div>
    </main>
  );
};

export default Register;
