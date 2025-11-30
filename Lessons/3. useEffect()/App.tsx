import { useEffect, useState, type ReactElement } from 'react';
import './App.css';
import Todo from './Todo';

export type todoType = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

const App = ():ReactElement => {
	const [todos, setTodos] = useState<todoType[]>([]);

	// useEffect(async () => {
	// 	const response = await fetch('https://jsonplaceholder.typicode.com/todos');
	// 	const json = await response.json();
	// 	setTodos(json);
	// 	console.log("First render.");

	// 	return console.log("unmount");

	// });
	const getTodos = async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos');
		const json = await response.json();
		setTodos(json);
	}
	useEffect(() => {
		getTodos();
		return console.log("First render");
	},[]);

	useEffect(()=>{
		console.log("All renders...");
	});
	
	useEffect(() => {
		console.log("Todos state to updated");
	}, [todos]);

	const removeTodo = (id: number): void => {
		setTodos(todos.filter(todo => todo.id != id));
	}
	
	return <>
		<h1 style={{ color: "green", marginBottom: "2rem" }}> Todos </h1>
		{todos.length ?
			todos.map((todo) => {
				return <Todo todo={todo} remove={removeTodo} key={todo.id} />
			})
			: "Not has Todos"
		}
	</>
}

export default App;
