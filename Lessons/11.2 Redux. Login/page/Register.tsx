import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/slide';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { TStore, store } from '../store';

type AppDispatch = typeof store.dispatch;

function Register() {
	const dispatch = useDispatch<AppDispatch>();
	const { user, loading, error } = useSelector((state: TStore) => state.auth);
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
		password: "",
		name:""
	})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(registerUser(form));
	}
	useEffect(()=>{
		if(user && !loading) 
			navigate('/');
	},[loading, navigate, user]);
	
	if (user) return <Navigate to="/" />;

	return (
		<div>
			<h2>Register</h2>
			<Link to="/">Home</Link>{" "}<Link to="/login">Login</Link><br />
			<form onSubmit={handleSubmit}>
				<input type="text"
					placeholder='Name'
					onChange={e => setForm({ ...form, name: e.target.value })}
				/>
				<input type="text"
					placeholder='Email'
					onChange={e => setForm({ ...form, email: e.target.value })}
				/>
				<input type="text" minLength={5}
					placeholder='Password'
					onChange={e => setForm({ ...form, password: e.target.value })}
				/>
				<button type="submit">{loading ? "Loading" : "Register"}</button>
			</form>
			{error && <p style={{color:"red"}}>{error}</p>}
		</div>
	)
}

export default Register;