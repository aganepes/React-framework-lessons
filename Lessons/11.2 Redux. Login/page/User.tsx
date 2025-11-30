import React from 'react'
import { useSelector } from 'react-redux'
import {TStore} from '../store';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/slide';

function User() {
	const {user} = useSelector((s:TStore)=>s.auth);
	const dispatch = useDispatch();
  return (
	<div>
		<h1>Welcome {user?.name}</h1>
		<button onClick={()=>dispatch(logout())}>Logout</button>
	</div>
  )
}

export default User