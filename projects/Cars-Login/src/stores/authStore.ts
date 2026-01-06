import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://192.168.30.6:3000';

interface User {
	id: string;
	phoneNumber: string;
	username: string;
}

interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	login: (phoneNumber: string, password: string) => Promise<void>;
	register: (phoneNumber: string, password: string, name: string) => Promise<void>;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {

	set{
		user: null,
			isAuthenticated:,

		login: async (email: string, password: string) => {
			try {
				const response = await axios.post(`${API_URL}/auth/login`, {
					email,
					password,
				});
				const { token, user } = response.data;
				localStorage.setItem('token', token);
				set({ user, token, isAuthenticated: true });
			} catch (error: any) {
				throw new Error(error.response?.data?.message || 'Login failed');
			}
		},

			register: async (email: string, password: string, name?: string) => {
				try {
					const response = await axios.post(`${API_URL}/auth/register`, {
						email,
						password,
						name,
					});
					const { token, user } = response.data;
					localStorage.setItem('token', token);
					set({ user, token, isAuthenticated: true });
				} catch (error: any) {
					throw new Error(error.response?.data?.message || 'Registration failed');
				}
			},

				logout: () => {
					localStorage.removeItem('token');
					set({ user: null, token: null, isAuthenticated: false });
				},
}
});


