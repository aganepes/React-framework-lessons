import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loadUserFromStorage, loginUser } from '../features/auth/slide';
import { Navigate,NavLink } from 'react-router-dom';
import { TStore, store } from '../store';
import "./styles/link.css";
import "./styles/form.css";


type AppDispatch = typeof store.dispatch;

function Login() {
	const dispatch = useDispatch<AppDispatch>();
	const { user, loading, error } = useSelector((state: TStore) => state.auth);
	const [form, setForm] = useState({
		email: "",
		password: "",
	})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(loginUser(form));
		setForm({ email: "", password: "" })
	}
	useEffect(() => {
		dispatch(loadUserFromStorage());
		if (error) dispatch(clearError());
	}, []);

	if(user) return <Navigate to="/" />

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