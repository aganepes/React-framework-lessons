import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loadUserFromStorage, registerUser } from '../features/auth/slide';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { TStore, store } from '../store';

type AppDispatch = typeof store.dispatch;

function Register() {
	const dispatch = useDispatch<AppDispatch>();
	const { user, loading, error } = useSelector((state: TStore) => state.auth);
	const [form, setForm] = useState({
		email: "",
		password: "",
		name: ""
	})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(registerUser(form));
		setForm({
			email: "",
			password: "",
			name: ""
		})
	}
	useEffect(() => {
		dispatch(loadUserFromStorage());
		if (error) dispatch(clearError());
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