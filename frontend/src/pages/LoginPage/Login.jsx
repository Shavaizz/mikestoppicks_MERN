import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css";
const Login = ({ onLogin }) => {
	const [username, setUsername] = useState(""); // Renamed to email
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(""); // Clear previous errors
		try {
			const response = await axios.post(
				"http://localhost:3000/api/user/login",
				{
					username,
					password,
				}
			);
			const { user, token } = response.data;
			if (user && token) {
				onLogin({ user, token });
				if (user.isAdmin) {
					navigate("/splash");
					console.log(token);
				} else {
					navigate("/");
				}
			} else {
				throw new Error("Invalid server response");
			}
		} catch (err) {
			setError(err.response?.data?.message);
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="login-wrapper">
				<h2>Login</h2>
				{error && <p style={{ color: "red" }}>{error}</p>}
				<form id="form-wrapper" onSubmit={handleLogin} disabled={loading}>
					<div>
						<label>Username: </label> {/* Updated label */}
						<input
							type="username"
							value={username} // Updated to username
							onChange={(e) => setUsername(e.target.value)} // Updated to username
							required
						/>
					</div>
					<div>
						<label>Password: </label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" id="login-button">
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
		</>
	);
};

export default Login;
