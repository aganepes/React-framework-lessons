import React from 'react'
import type { todoType } from './App';

interface PropsType { todo: todoType,remove:(id:number)=>void } ;

class Todo extends React.Component<PropsType> {
	constructor(props:PropsType ) {
		super(props);
	}
	componentDidUpdate() {
		console.log(this.props.todo.id,"-remove and update");
	}
	componentWillUnmount(){
		console.log(`${this.props.todo.id} - removed to todo.`);
	}
	render() {
		return <>
			<h4>ID: {this.props.todo.id}</h4>
			<h5>Title: {this.props.todo.title}</h5>
			<h6>Body:</h6>
			<p>{this.props.todo.body}</p>
			<span>userId: {this.props.todo.userId}</span><br />
			<button onClick={()=>this.props.remove(this.props.todo.id)}>Delete ❌</button>
			<hr />
		</>
	};
}

export default Todo;