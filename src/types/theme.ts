import type React from "react";

export interface ThemeState {
	theme: "light" | "dark";
}

export type ThemeAction = { type: "TOGGLE_THEME"};

export interface ThemeContextProps {
	state: ThemeState;
	dispatch: React.Dispatch<ThemeAction>;
}

export const initialThemeState: ThemeState = {
	theme: "light"
}