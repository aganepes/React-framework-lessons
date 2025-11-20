import React, { useEffect } from 'react'
import type { todoType } from './App';

interface PropsType { todo: todoType, remove: (id: number) => void };

const Todo = (props: PropsType): React.ReactElement<PropsType> => {

	useEffect(() => {
		console.log(props.todo.id, "-remove and update");
		return ()=>{
			console.log(`${props.todo.id} - removed to todo.`);
		}
	},[]);
	return <>
		<h4>ID: {props.todo.id}</h4>
		<h5>Title: {props.todo.title}</h5>
		<h6>Completed:</h6>
		<p>{props.todo.completed}</p>
		<span>userId: {props.todo.userId}</span><br />
		<button onClick={() => props.remove(props.todo.id)}>Delete ❌</button>
		<hr />
	</>
}
export default Todo;