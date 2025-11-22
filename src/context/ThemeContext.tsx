import { createContext, useReducer, type FC, type ReactNode } from "react";
import  { initialThemeState,type ThemeContextProps } from "../types/theme";
import { themeReducer } from "./ThemeReducer";


export const ThemeContext = createContext<ThemeContextProps|undefined>(undefined);

interface ThemeProviderProps {
	children:ReactNode
}

export const ThemeProvider:FC<ThemeProviderProps> = ({children})=>{
	const [state,dispatch] = useReducer(themeReducer,initialThemeState);
	const contextValue : ThemeContextProps = {state,dispatch};

	return (
		<ThemeContext.Provider value={contextValue}>
		{children}
		</ThemeContext.Provider>
	)
}