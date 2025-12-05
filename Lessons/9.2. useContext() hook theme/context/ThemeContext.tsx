import { createContext, useReducer, type FC, type ReactNode } from "react";


interface ThemeState {theme: "light" | "dark"}
type ThemeAction = { type: "TOGGLE_THEME" };

export type ThemeContextProps = {
	state: ThemeState;
	dispatch: React.Dispatch<ThemeAction>;
} | null;

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
	switch (action.type) {
		case "TOGGLE_THEME":
			return {
				...state,
				theme: state.theme == "dark" ? "light" : "dark",
			}
		default:
			return state
	}
}


// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextProps>(null);

interface ThemeProviderProps {
	children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(themeReducer, { theme: "light" });
	const contextValue = { state, dispatch };

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	)
}
