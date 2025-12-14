import React, { useEffect, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom';
import "./styles/link.css";
import "./styles/form.css";
import { useAuthStore } from '../features/auth/store';


function Login() {
	const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage);
	const user = useAuthStore((state) => state.user);
	const loading = useAuthStore((state) => state.loading);
	const error = useAuthStore((state) => state.error) as string;
	const loginUser = useAuthStore((state) => state.login);
	const clearError = useAuthStore((state) => state.clearError);


	const [form, setForm] = useState({
		email: "",
		password: "",
	})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		loginUser(form)
		setForm({ email: "", password: "" })
	}
	useEffect(() => {
		loadUserFromStorage();
		if (error) clearError();
	}, []);

	if (user) return <Navigate to="/" />

	return (
		<div>
			<h2>Login</h2>
			<ul className='list'>
				<li>
					<NavLink to='/'
						className={({ isActive }) => isActive ? "active-link" : "link"}
					>Home</NavLink>
				</li>
				<li>
					<NavLink to='/register'
						className={({ isActive }) => isActive ? "active-link" : "link"}
					>Register</NavLink>
				</li>
			</ul>
			<form onSubmit={handleSubmit} className='form-container'>
				<input type="email"
					placeholder='Email'
					name='email'
					value={form.email}
					onChange={e => setForm({ ...form, email: e.target.value })}
				/>
				<input type="text" minLength={5}
					placeholder='Password'
					name="password"
					autoComplete='off'
					value={form.password}
					onChange={e => setForm({ ...form, password: e.target.value })}
				/>
				<button type="submit">{loading ? "Loading" : "Login"}</button>
			</form>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	)
}

export default Login;