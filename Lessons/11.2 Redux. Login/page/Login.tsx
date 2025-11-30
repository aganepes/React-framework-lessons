import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/slide';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { TStore, store} from '../store';

type AppDispatch = typeof store.dispatch;

function Login() {
	const dispatch = useDispatch<AppDispatch>();
	const { user, loading, error } = useSelector((state:TStore) => state.auth);
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
		password: "",
	})
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(loginUser(form));
	}
	useEffect(()=>{
			if(user) navigate('/');
		},[loading, navigate, user]);
		
	if (user) return <Navigate to="/" />;

	return (
		<div>
			<h2>Login</h2>
			<Link to="/">Home</Link>{"  "} <Link to="/register">Register</Link><br />
			<form onSubmit={handleSubmit}>
				<input type="text"
					placeholder='Email'
					onChange={e => setForm({ ...form, email: e.target.value })}
				/>
				<input type="text" minLength={5}
					placeholder='Password'
					onChange={e => setForm({ ...form, password: e.target.value })}
				/>
				<button type="submit">{loading ? "Loading" : "Login"}</button>
			</form>
			{error && <p style={{color:"red"}}>{error}</p>}
		</div>
	)
}

export default Login;