import { useState } from "react";
import { registerUser } from "../api/auth";
import { Link } from "react-router-dom";

  export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await registerUser(email, password);
      setMessage("User registered successfully!");
    } catch (err) {
      setMessage(
        err.response?.data?.email ||
        err.response?.data?.password ||
        err.response?.data?.detail ||
        "Error registering user"
      );
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
          {message && <p className="message">{message}</p>}
          <div style={{ marginTop: "1rem" }}>
            <span>Already have an account? </span>
            <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
