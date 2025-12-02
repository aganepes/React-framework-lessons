import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuthStore } from "../features/auth/store";

type TProps = { children: React.ReactNode };
export default function ProtectedRoute(props: TProps) {
	const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage);
	const user = useAuthStore((state) => state.user);
	
	useEffect(() => {
		loadUserFromStorage();
	}, []);

	if (!user) return <Navigate to="/login" />

	return props.children;
}