import type React from "react";

export type UserData = {
	name: string;
	email: string;
	password: string;
}
type TUser = {
	id: number;
	name: string;
	email: string;
	password: string;
}

export type Auth = {
	isLoggedIn: boolean;
	status: "idle" | "loading" | "success" | "error";
};
export type Lang = "en" | "tm" | "ru";

export interface GlobalState {
	theme: "light" | "dark";
	lang: Lang;
	auth: Auth;
	user: UserData | null;
}
export type GlobalAction = { type: "TOGGLE_THEME" } |
{ type: "CHANGE-LANG", payload: Lang } |
{ type: "START-LOGIN" } |
{ type: "LOGIN", payload: TUser } |
{ type: "LOGIN-ERROR" } |
{ type: "LOGOUT" } |
{ type: "REGISTER", payload: UserData };


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
}