import type { FC } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggler from "./components/ThemeToggler";

const App:FC=()=>{
	return (
		<ThemeProvider>
			<div style={{padding:"20px"}}>
			<h1>Example to Context API</h1>
			<ThemeToggler/>
			</div>
		</ThemeProvider>
	)
}
export default App;