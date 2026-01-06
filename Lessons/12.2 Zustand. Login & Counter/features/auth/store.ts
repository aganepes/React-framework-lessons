import { create } from 'zustand';
import {
	ApiLogin, type TApiLogin,
	ApiRegister, type TApiRegister,
	type TUser,
	type TUserData, type TUserLogin
} from "./api";


export type TState = {
	error: null | string | unknown,
	loading: boolean
	token: null | string,
	user: null | Omit<TUser, "password"> | TUser,
}

interface IAsyncAuthActions {
	login: (user: TUserLogin) => Promise<void>;
	register: (user: TUserData) => Promise<void>
}
interface IAuthActions {
	logout: () => void;
	loadUserFromStorage: () => void;
	clearError: () => void;
}
type TAuthStore = TState & IAsyncAuthActions & IAuthActions;

export const useAuthStore = create<TAuthStore>((set) => ({
	user: null,
	token: null,
	error: null,
	loading: false,
	login: async (user: TUserLogin) => {
		set({ loading: true, error: null });
		try {
			const data = await ApiLogin(user) as TApiLogin;
			set({
				loading: false,
				token: data?.token,
				user: data?.user
			})
			localStorage.setItem('auth', JSON.stringify({ user: data!.user, token: data!.token }));
		} catch (error) {
			set({
				loading: false,
				error: error
			})
		}
	},
	register: async (user: TUserData) => {
		set({ loading: true, error: null });
		try {
			const data = await ApiRegister(user) as TApiRegister;
			set({
				loading: false,
				token: data?.token,
				user: data?.user
			});

			localStorage.setItem('auth', JSON.stringify({ user: data!.user, token: data!.token }));
		} catch (error) {
			set({
				loading: false,
				error: error
			})
		}
	},
	logout: () => {
		set({
			user: null,
			token: null,
			error: null,
		});
		localStorage.removeItem("auth");
	},
	clearError: () => {
		set({ error: null })
	},
	loadUserFromStorage: () => {
		const saved = JSON.parse(localStorage.getItem('auth')!);
		if (saved) {
			set({
				user: saved.user,
				token: saved.token
			});
		}
	}
}))