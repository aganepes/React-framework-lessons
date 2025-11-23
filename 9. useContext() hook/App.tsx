import type { FC } from "react";
import "./styles/App.css";
import ThemeToggler from "./components/ThemeToggler";

const App: FC = () => {
	return (
		<>
			<div style={{ padding: "20px" }}>
				<h1>Example to Context API</h1>
				<ThemeToggler />
			</div>
		</>
	)
}
export default App;