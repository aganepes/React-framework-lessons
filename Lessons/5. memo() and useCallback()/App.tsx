import { useState, useCallback, memo, type FC } from 'react';
import './App.css';


interface ButtonProps {
	handleClick: (message: string) => void;
	label: string;
}

const MemoizedButton: FC<ButtonProps> = memo(({ label, handleClick }) => {
	const [numb, setNumb] = useState<number>(1);
	console.log(`Render ${label} button`);
	return <>
		<button onClick={() => {
			handleClick(`Clicked - ${numb}: ${label} button`);
			setNumb(n => n + 1)
		}
		}>
			{label}
		</button>
	</>
});


const App: FC = () => {
	const [count, setCount] = useState<number>(0);
	const [message, setMessage] = useState<string>('');

	const handleCountClick = useCallback(() => {
		console.log("This is handleCountClick");
		setCount(c => c + 1);
	}, []);
	
	const handleMessageClick = useCallback((msg: string) => {
		setMessage(msg);
	}, [message]);



	return (<div>
		<h3>useCallback Example</h3>
		<p>Number: {count}</p>
		<p>Message: {message}</p>
		<button onClick={handleCountClick}>Number + </button>
		<MemoizedButton handleClick={handleMessageClick} label="Change to message" />
	</div>)
}

export default App;
