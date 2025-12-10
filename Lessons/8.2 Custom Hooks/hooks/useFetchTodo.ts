import { useEffect, useState } from "react";
import type { todoType } from "../App";

type fetchTodo = { data: todoType[], error: unknown, loading: boolean };

const useFetchTodo = (userId: number): fetchTodo => {
	const [data, setData] = useState<todoType[]>([]);
	const [error, setError] = useState<unknown>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchTodo = () => {
			return new Promise(() => {
				setTimeout(async () => {
					try {
						const response = await fetch("http://localhost:3000/todos");
						const data = (await response.json()) as todoType[];
						setData(data.filter(t => t.userId === userId));
					} catch (error) {
						setError(error);
					} finally {
						setLoading(false);
					}
				}, 2000)
			})
		}
		fetchTodo();
	}, [userId]);

	return { data, error, loading };
}

export default useFetchTodo;