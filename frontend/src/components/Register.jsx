import { useState } from "react";
import { registerUser, loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

  export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsSuccess(false);
      return;
    }
    setLoading(true);
    try {
      await registerUser(email, password);
      setMessage("User registered successfully!");
      setIsSuccess(true);
      const loginData = await loginUser(email, password);
      if (loginData.access) {
        login(loginData.access);
      } else {
        navigate("/login");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.email ||
        err.response?.data?.password ||
        err.response?.data?.detail ||
        "Error registering user"
      );
      setIsSuccess(false);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h2>Welcome!</h2>
        <p>Create your account and start using our platform.</p>
      </div>
      <div className="right-panel">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
          {message && (
            <p className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</p>
          )}
          <div style={{ marginTop: "1rem" }}>
            <span>Already have an account? </span>
            <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
