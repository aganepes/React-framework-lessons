import { type FC, useReducer } from 'react';

interface State {
	count: number;
}

type Action = {
	type: "INCREMENT" | "DECREMENT" | "RESET",
	payload?: number
};

const countReducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "INCREMENT":
			return { count: state.count + 1 }
		case "DECREMENT":
			return { count: state.count - 1 }
		case "RESET":
			return { count: action.payload! }
		default:
			return state
	}
}

const App: FC = () => {
	const [state, countDispatch] = useReducer(countReducer, { count: 0 });

	return (<div className='bg-white bg-[size:20px_20px] bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)]'>
		<h3>useReducer Example</h3>
		<p>Number: {state.count}</p>
		<button
			onClick={() => countDispatch({ type: "INCREMENT" })}>Number + </button>
		<br />
		<button
			onClick={() => countDispatch({ type: "DECREMENT" })}>Number - </button>
		<br />
		<button
			onClick={() => countDispatch({ type: "RESET", payload: 10 })}>Number = 10 </button>
		<br />
	</div>)
}

export default App;
