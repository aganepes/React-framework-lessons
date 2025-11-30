import React from 'react';
import './App.css';
import Todo from './Todo';

export type todoType = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}
type stateType = { todos: todoType[] };

class App extends React.Component<unknown, stateType> {
	constructor(props: unknown) {
		super(props);
		this.state = { todos: [] }
	}
	async componentDidMount(): Promise<void> {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos');
		const json = await response.json();
		this.setState({todos:json});
		// this.removeTodo=this.removeTodo.bind(this);
	}
	// removeTodo(id:number):void{
	// 	this.setState({
	// 		todos:this.state.todos.filter(todo=>todo.id!=id)
	// 	});
	// }
	removeTodo=(id:number):void=>{
		this.setState({
			todos:this.state.todos.filter(todo=>todo.id!=id)
		});
	}
	componentDidUpdate(prevProps: unknown, prevStates: stateType): void {
		if (this.state.todos != prevStates.todos) {
			console.log("Todos state to updated");
		}
	}
	componentWillUnmount(): void {
		console.log("unmount");
	}
	render() {
		return <>
			<h1 style={{ color: "green", marginBottom:"2rem" }}> Todos </h1>
			{this.state.todos.length ?
				this.state.todos.map((todo, index) => {
					// key={todo.id}
					return <Todo todo={todo} remove={this.removeTodo}  key={index}/>
				})
				: "Not has Todos"
			}
		</>
	}
}

export default App;
