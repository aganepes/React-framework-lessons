import { useEffect, useState, type ReactElement } from 'react';
import './App.css';
import Todo from './Todo';

export type todoType = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

const App = (): ReactElement => {
	const [todos, setTodos] = useState<todoType[]>([]);

	const getTodos = async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos');
		const json = await response.json();
		setTodos(json);
	}
	useEffect(() => {
		getTodos();
		return console.log("First render");
	}, []);

	const removeTodo = (id: number): void => {
		setTodos(todos.filter(todo => todo.id != id));
	}
	function setTodo(todo:todoType){
		const index = todos.findIndex(v=>v.id==todo.id);
		if(index!=-1){
			setTodos(todos.map((t)=>{
				if(t.id==todos[index].id){
					return todo;
				}else{
					return t;
				}
			}));
		}
	}
	return <>
		<h1 style={{ color: "green", marginBottom: "2rem" }}> Todos </h1>
		{todos.length ?
			todos.map((todo) => {
				return <Todo todo={todo} remove={removeTodo} key={todo.id} setTodo={setTodo}/>
			})
			: "Not has Todos"
		}
	</>
}

export default App;
