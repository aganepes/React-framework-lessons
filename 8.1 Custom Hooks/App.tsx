import { type FC, useCallback, useState } from 'react';
import './App.css';

type countType = {
	count: number;
	increment: () => void;
	decrement: () => void;
	reset: (initial: number | undefined) => void
}

const useCounter = (initialValue: number = 0): countType => {
	const [numb, setNumber] = useState<number>(initialValue);
	const increment = useCallback(() => {
		setNumber(n=>n + 1);
	}, []);

	const decrement = useCallback(() => {
		setNumber(n=>n - 1);
	}, []);

	const reset = useCallback((initial: number | undefined) => {
		setNumber(initial ? initial : initialValue);
	}, [initialValue])

	return { reset, count: numb, increment, decrement }
}


const App: FC = () => {
	const { count, reset, increment, decrement } = useCounter(1);
	return (<div>
		<h3>Custom Hooks Example</h3>
		<h4>Count : {count}</h4>
		<div style={{ border: "1px solid red", padding: "10px" }}>
			<button
				onClick={increment}>ID + </button>
			<br />
			<button
				onClick={decrement}>ID - </button>
			<br />
			<button
				onClick={() => reset(5)}>ID = 1 </button>
		</div>
	</div>)
}

export default App;
