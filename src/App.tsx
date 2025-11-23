import type { FC } from "react";
import { GlobalProvider } from "./context/GlobalContext";
import MainComponent from "./components/MainRC";

const App:FC=()=>{
	return (
		<GlobalProvider>
			<div style={{padding:"20px"}}>
			<h1>Example to Context API</h1>
			<MainComponent/>
			</div>
		</GlobalProvider>
	)
}
export default App;