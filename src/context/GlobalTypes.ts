import type React from "react";

export type UserData = {
	id: string;
	name: string;
	email: string;
	password: string;
}
export type Auth = {
	isLoggedIn: boolean;
	status: "idle" | "loading" | "success" | "error";
};
export type Lang = "en" | "tm" | "ru";
export type RegisterType = "none" | "register";
export interface GlobalState {
	theme: "light" | "dark";
	lang: Lang;
	auth: Auth;
	user: Partial<UserData> | null;
	registerStatus:RegisterType;
}
export type ActionType = "TOGGLE_THEME" |
	"CHANGE-LANG"|
	"IS-LOGIN" | "LOGOUT" |  "REGISTER" | "LOGIN" |
	"LOADING-AUTH" | "ERROR-AUTH" ;

export type GlobalAction = {
	type: ActionType;
	payload?: {
		user?: Partial<UserData> | null;
		auth?: Auth;
		registerStatus?:RegisterType;
		lang?: Lang;
	}
};

export interface GlobalContextProps {
	state: GlobalState;
	dispatch: React.Dispatch<GlobalAction>;
}

export const initialGlobalState: GlobalState = {
	theme: "light",
	lang: "en",
	auth: {
		isLoggedIn: false,
		status: "idle"
	},
	user: null,
	registerStatus:"none"
}