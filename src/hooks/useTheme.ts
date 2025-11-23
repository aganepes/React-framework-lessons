import { useContext } from "react";
import type { ThemeContextProps } from "../types/theme";
import { ThemeContext } from "../context/ThemeContext";



export const useTheme = ():ThemeContextProps=>{
	const context  = useContext(ThemeContext);
	if(context === undefined){
		throw new Error("useTheme using to into ThemeProvider");
	}
	return context;
}