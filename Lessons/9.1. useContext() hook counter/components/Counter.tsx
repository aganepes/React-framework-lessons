import {  useContext } from "react";
import { CounterContext, TState, useGlobal } from "../context/Counter";

function ThemeToggler() {
	const {counter,incrementCounter,decrementCounter,resetCounter,theme,toggleTheme  } = useGlobal()

	return (
		<div>
			<h2>theme : {theme}</h2> <button onClick={toggleTheme}></button>
			<h2>Current Counter : {counter}</h2>
			<button onClick={()=>incrementCounter()}>counter +</button>
			<button onClick={()=>decrementCounter()}>counter -</button>
			<button onClick={()=>resetCounter(0)}>reset</button>
		</div>
	)
}

export default ThemeToggler;

