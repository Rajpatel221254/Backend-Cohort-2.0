import React, { useState } from "react";
import "../style/login.scss";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await handleLogin({ email: email, password: password });
      navigate("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  }

  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <FormGroup
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
              placeholder="Enter your email"
              type="email"
            />
            <FormGroup
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <button className="login-button" type="submit">
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <p className="login-text">
              Don't have an account?{" "}
              <Link to="/register" className="login-link">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <div className="login-decoration"></div>
      </div>
    </main>
  );
};

export default Login;

