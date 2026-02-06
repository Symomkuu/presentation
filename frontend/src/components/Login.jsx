import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/auth";
import useAuth from "../context/useAuth";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();



	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setIsSuccess(false);
		setLoading(true);
		try {
			const data = await loginUser(email, password);
			if (data.access && data.refresh) {
				login(data.access);
				setMessage("Login successful!");
				setIsSuccess(true);
			} else {
				setMessage(data.detail || "Login failed");
				setIsSuccess(false);
			}
		} catch (err) {
			setMessage(err.response?.data?.detail || err.message || "Login failed");
			setIsSuccess(false);
		}
		setLoading(false);
	};

	return (
		<div className="container">
			<div className="left-panel">
				<h2>Welcome Back!</h2>
				<p>Login to your account.</p>
			</div>
			<div className="right-panel">
				<form onSubmit={handleSubmit}>
					<h2>Login</h2>
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
					<button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
					{message && (
						<p className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</p>
					)}
					<div style={{ marginTop: "1rem" }}>
						<span>Don't have an account? </span>
						<Link to="/register">Create</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
