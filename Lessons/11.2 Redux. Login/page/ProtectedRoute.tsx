import { useSelector } from "react-redux";
import { TStore } from "../store"
import { Navigate } from "react-router-dom";
import React from "react";

type TProps = { children: React.ReactNode };
export default function ProtectedRoute(props: TProps) {
	const { user } = useSelector((s: TStore) => s.auth);

	if (!user) return <Navigate to="/login" />
	
	return props.children;
}