import { useSelector } from "react-redux";
import { TStore } from "../store"
import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { loadUserFromStorage } from "../features/auth/slide";
import { useDispatch } from "react-redux";
import {store} from "../store";

type TProps = { children: React.ReactNode };
export default function ProtectedRoute(props: TProps) {
	const { user } = useSelector((s: TStore) => s.auth);
	const dispatch = useDispatch<typeof store.dispatch>()
	useEffect(()=>{
		dispatch(loadUserFromStorage());
	},[]);
	
	if (!user) return <Navigate to="/login" />
	
	return props.children;
}