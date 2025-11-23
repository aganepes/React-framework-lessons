import {  useContext } from "react";
import { CounterContext, TState } from "../context/Counter";

function ThemeToggler() {
	const {counter,incrementCounter,decrementCounter,resetCounter  } = useContext<TState|null>(CounterContext)!;

	return (
		<div>
			<h2>Current Counter : {counter}</h2>
			<button onClick={()=>incrementCounter()}>counter +</button>
			<button onClick={()=>decrementCounter()}>counter -</button>
			<button onClick={()=>resetCounter(0)}>reset</button>
		</div>
	)
}

export default ThemeToggler;