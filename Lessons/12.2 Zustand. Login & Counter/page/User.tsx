import React from 'react'
import "./styles/link.css"
import { useAuthStore } from '../features/auth/store';
import { Link } from 'react-router-dom';
import "./styles/user.css";

function User() {
		const user = useAuthStore((state) => state.user);
		const logout = useAuthStore((state) => state.logout);
  return (
	<>
		<h1>Welcome {user?.name}</h1>
		<Link to="/" className='link'>Go Home</Link>
		<button onClick={()=>logout()} className='button-logout'>Logout</button>
	</>
  )
}

export default User