import { useEffect, useState } from "react";
import { getUserInfo } from "../api/auth";
import useAuth from "../context/useAuth";


export default function Dashboard() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const { logout } = useAuth();

	useEffect(() => {
		const token = localStorage.getItem("access");
		getUserInfo(token)
			.then((data) => {
				setUser(data);
				setLoading(false);
			})
			.catch(() => {
				setError("Failed to fetch user info.");
				setLoading(false);
			});
	}, []);


	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="dashboard-container">
			<h2>Welcome{user?.username ? `, ${user.username}` : user?.email ? `, ${user.email}` : ""}!</h2>
			<p>This is your dashboard.</p>
			<div>
				<strong>Email:</strong> {user?.email || "N/A"}<br />
				<strong>Username:</strong> {user?.username || "N/A"}
			</div>
			<div style={{ marginTop: "1rem" }}>
				<button onClick={logout}>Logout</button>
			</div>
		</div>
	);
}
