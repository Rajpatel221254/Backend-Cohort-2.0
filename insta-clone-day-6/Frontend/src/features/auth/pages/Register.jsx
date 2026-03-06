import { useState } from "react";
import "../styles/form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { showError, showSuccess } from "../hooks/useToast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { handleRegister, loading, user } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await handleRegister(email, username, password);

      navigate("/profilesetup");

      showSuccess("Registered Succesfull✅");
    } catch (error) {
      console.log(error);

      showError("Registration Failed❌");
    }
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="auth">
      <div className="card">
        <div className="brand">
          <h1>Lumora</h1>
          <p>Create your account ✨</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="inputGroup">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              placeholder="Enter username"
            />
          </div>

          <div className="inputGroup">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Enter email"
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
            Sign Up
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <p className="switchText">
          Already have an account?
          <Link className="authToggle" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
