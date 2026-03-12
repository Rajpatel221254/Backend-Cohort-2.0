import React, { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { handleLogin, loading, user } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await handleLogin(identifier, password);
      console.log(res);
      if (res && res.user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <h1>Loading.....</h1>;
  }

  return (
    <div className="auth">
      <div className="card">
        <div className="brand">
          <h1>Lumora</h1>
          <p>Welcome back 👋</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="inputGroup">
            <input
              onInput={(e) => setIdentifier(e.target.value)}
              type="text"
              placeholder="Username or Email"
              name="identifier"
              value={identifier}
            />
          </div>

          <div className="inputGroup passwordGroup">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={password}
            />

            <span
              className="toggleBtn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button type="submit" className="primaryBtn">
            Log In
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <p className="switchText">
          Don’t have an account?
          <Link className="authToggle" to="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
