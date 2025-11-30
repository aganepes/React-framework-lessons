import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from './redux/sliders/counter';
import { TState } from "./redux/store";
import "./styles/app.css";

function Header() {
	const state = useSelector((state: TState) => state.counter.value)
	return <>
		<h1 className='title'>Counter App</h1>
		<p className='counter'> <strong>{state}</strong> </p>
	</>
}


function App() {
	const dispatch = useDispatch();
	return (<>
		<Header />
		<div className="buttons">
			<button className='button increment' onClick={() => dispatch(increment())}>Increment</button>
			<button className='button reset' onClick={() => dispatch(reset(10))}>Reset 10</button>
			<button className='button decrement' onClick={() => dispatch(decrement())}>Decrement</button>
		</div>
	</>)
}

export default App