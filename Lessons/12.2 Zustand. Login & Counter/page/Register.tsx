import React, { useEffect, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';


function Register() {
	const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage);
	const user = useAuthStore((state) => state.user);
	const loading = useAuthStore((state) => state.loading);
	const register = useAuthStore((state) => state.register);
	const error = useAuthStore((state) => state.error) as string;
	const clearError = useAuthStore((state) => state.clearError);
	
	const [form, setForm] = useState({
		email: "",
		password: "",
		name: ""
	})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		register(form);
		setForm({
			email: "",
			password: "",
			name: ""
		})
	}
	useEffect(() => {
		loadUserFromStorage();
		if (error) clearError();
	}, []);

	if (user) return <Navigate to="/" />

	return (
		<div>
			<h2>Register</h2>
			<ul className='list'>
				<li>
					<NavLink to='/'
						className={({ isActive }) => isActive ? "active-link" : "link"}
					>Home</NavLink>
				</li>
				<li>
					<NavLink to='/login'
						className={({ isActive }) => isActive ? "active-link" : "link"}
					>Login</NavLink>
				</li>
			</ul>
			<form onSubmit={handleSubmit} className="form-container">
				<input type="text"
					name='name'
					autoComplete='off'
					placeholder='Name'
					onChange={e => setForm({ ...form, name: e.target.value })}
				/>
				<input type="email"
					name='email'
					placeholder='Email'
					onChange={e => setForm({ ...form, email: e.target.value })}
				/>
				<input type="text" minLength={5}
					name='password'
					autoComplete='off'
					placeholder='Password'
					onChange={e => setForm({ ...form, password: e.target.value })}
				/>
				<button type="submit">{loading ? "Loading" : "Register"}</button>
			</form>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	)
}

export default Register;