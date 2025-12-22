/*
3. "Önceki Değer" Takipçisi (Persist Değerler)
React'te bir state'in bir önceki render'daki halini merak ediyorsanız useRef kullanmalısınız. Çünkü useRef güncellendiğinde bileşen render olmaz ama bir sonraki render'da eski değeri içinde tutmaya devam eder.
*/
import { useState, useEffect, useRef } from 'react';

function PreviousValue() {
	const [count, setCount] = useState(0);
	const prevCountRef = useRef();

	useEffect(() => {
		// This process runs after the render is complete. 
		// Therefore, prevCountRef retains the previous value.
		prevCountRef.current = count;
	}, [count]);

	const prevCount = prevCountRef.current;

	return (
		<div>
			<h1>Current: {count} / Previous: {prevCount}</h1>
			<button onClick={() => setCount(count + 1)}>Increase</button>
			<button onClick={() => setCount(count - 1)}>Reduce</button>
		</div>
	);
}

export default PreviousValue;