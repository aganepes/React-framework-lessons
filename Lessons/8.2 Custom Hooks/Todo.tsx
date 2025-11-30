import React, { type ReactNode } from 'react'
import styles from "./todo.module.css";
import useFetchTodo from './hooks/useFetchTodo';


interface PropsType {
	user: {
		userId: number
	};
	children:ReactNode
};

const Todo = (props: PropsType): React.ReactElement<PropsType> => {
	const { data, error, loading } = useFetchTodo(props.user.userId);
	if (error) {
		return <>
			<h1 style={{ color: "red" }}>{error.message}</h1>
		</>
	}

	if (loading) {
		console.log("loading")
		return <>
			<h1 style={{ color: "greenyellow" }}>Loading ...</h1>
		</>
	}

	return <>
		<h1>USER: {props.user.userId} TODOS </h1>
		{data.length ?
			data.map((todo) => (
				<div key={todo.id}>
					<h3>ID: {todo.id}</h3>
					<h5 className={styles.todoTitle}>Title: {todo.title}</h5>
					<h6>Completed: <span>{todo.completed}</span></h6>
					{props.children}
				</div>
			))
			: <h1>`Not data this {props.user.userId} userid.`</h1>
		}

	</>
}
export default Todo;