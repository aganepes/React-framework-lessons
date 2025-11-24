import { type FC, useReducer, useState } from 'react';
import './App.css';
import Todos from './Todo';

export type todoType = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}
type State = { userId: number };
type Action = { type: "INCREMENT" | "DECREMENT" | "RESET" };

const todoReduce = (state: State, action: Action): State => {
	switch (action.type) {
		case "DECREMENT":
			return {userId:state.userId-1};
		case "INCREMENT":
			return {userId:state.userId+1};
		default:
			return {userId:1};
	}
}

const App: FC = () => {
	const [ state, todoDispatch ] = useReducer(todoReduce, { userId: 1 });
	return (<div>
		<h3>Custom Hooks Example</h3>
		<div style={{border:"1px solid red",padding:"10px"}}>
			<button
				onClick={() => todoDispatch({ type: "INCREMENT" })}>ID + </button>
			<br />
			<button
				onClick={() => todoDispatch({ type: "DECREMENT" })}>ID - </button>
			<br />
			<button
				onClick={() => todoDispatch({ type: "RESET"})}>ID = 1 </button>
		</div>
		<Todos user={state}>
			<div style={{height:"5px",backgroundColor:"orange"}}></div>
		</Todos>
	</div>)
}

export default App;
