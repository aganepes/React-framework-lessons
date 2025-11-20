import React, { useRef, useState } from 'react'
import type { todoType } from './App';
import styles from "./todo.module.css";


interface PropsType {
	todo: todoType,
	remove: (id: number) => void,
	setTodo: (todo: todoType) => void
};

const Todo = (props: PropsType): React.ReactElement<PropsType> => {
	const titleRef = useRef<HTMLInputElement>(null);

	const [visibleInput, setVisibleInput] = useState<boolean>(false);

	const handleChange = () => {
		const input = titleRef.current!;
		console.log(input);
		console.log(`Value ${props.todo.id}: `,input.value);
		props.setTodo({...props.todo,title:input.value});
		setVisibleInput(false)
	}
	return <>
		<h4>ID: {props.todo.id}</h4>

		{visibleInput ?
			<div className="input-cont">
				{/*value={props.todo.title}  */}
				<input type="text" defaultValue={props.todo.title} ref={titleRef} />
				<button onClick={handleChange}>Change to title of todo</button>
			</div>
			: <>
				<h5 onClick={() => setVisibleInput(true)} className={styles.todoTitle}>Title: {props.todo.title}</h5>
			</>
		}
		<h6>Completed:</h6>
		<p>{props.todo.completed}</p>
		<span>userId: {props.todo.userId}</span><br />
		<button onClick={() => props.remove(props.todo.id)}>Delete ❌</button>
		<hr />
	</>
}
export default Todo;