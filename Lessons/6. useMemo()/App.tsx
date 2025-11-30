import { useState, type FC, useMemo } from 'react';
import './App.css';


const calculValue = (num: number): number => {
	let sum = 0;
	for (let i = 0; i < num * 100; i++) {
		sum += i;
	}
	return sum;
}

const App: FC = () => {
	const [count, setCount] = useState<number>(0);
	const [text, setText] = useState<string>();

	const momoizedValue: number = useMemo(() => {
		return calculValue(count * 10);
	}, [count]);



	return (<div>
		<h3>useMemo Example</h3>
		<p>Number: {count}</p>
		<button onClick={() => setCount(c => c + 1)}>Number + </button>
		<p>Calculited value: **{momoizedValue}**</p>
		<input
			type="text"
			defaultValue={text}
			onChange={(e) => setText(e.target.value)}
			placeholder='Set to input'
		/>
		<p>Input value: {text}</p>
	</div>)
}

export default App;
