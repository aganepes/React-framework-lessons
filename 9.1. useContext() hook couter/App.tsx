import type { FC } from "react";
import "./styles/App.css";
import Counter from "./components/Counter";

const App: FC = () => {
	return (
		<>
			<div style={{ padding: "20px" }}>
				<h1>Example to Context API</h1>
				<Counter />
			</div>
		</>
	)
}
export default App;