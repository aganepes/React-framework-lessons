import React from 'react'
import { useSelector } from 'react-redux'
import {TStore} from '../store';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/slide';
import { Link } from 'react-router-dom';
import {store} from "../store";
import "./styles/link.css"

function User() {
	const {user} = useSelector((s:TStore)=>s.auth);
	const dispatch = useDispatch<typeof store.dispatch>();
  return (
	<>
		<h1>Welcome {user?.name}</h1>
		<Link to="/" className='link'>Go Home</Link>
		<button onClick={()=>dispatch(logout())}>Logout</button>
	</>
  )
}

export default User