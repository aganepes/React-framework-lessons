import { useEffect, useReducer } from "react";
import { initialState, questionReducer } from "./question";
// import { IQuestion } from "../types";

const useFetchQuestion = (lessonName: string | null) => {
	const [state, dispatch] = useReducer(questionReducer, initialState);

	const setId = (id: number) => {
		dispatch({ type: 'SET_ID', payload: id });
	};

	// const [id, setId] = useState<number>(1);
	// const [questionNumber, setQuestionNumber] = useState<number>(0);
	// const [isPending, setIsPending] = useState<boolean>(true);
	// const [isError, setIsError] = useState<string>("");
	// const [question, setQuestion] = useState<IQuestion | null>(null);

	useEffect(() => {
		const getQuestionLength = async () => {
			try {
				const response = await fetch(`http://localhost:3000/${lessonName}`);
				const data = await response.json();
				// setQuestionNumber(data.length);
				dispatch({ type: "FETCH_SUCCESS", payload: { length: data.length } });
			} catch (error: unknown) {
				if (error instanceof Error) {
					dispatch({ type: 'FETCH_ERROR', payload: error.message });
					// setIsError(error.message)
				}
			}
		}
		// setIsError();
		// setQuestionNumber(0);
		dispatch({ type: "FETCH_START" });
		getQuestionLength();
	}, [lessonName]);

	useEffect(() => {
		const getQuestion = async () => {
			if (state.id <= state.length && state.length) {
				try {
					const response = await fetch(`http://localhost:3000/${lessonName}/${state.id}`);
					const data = await response.json();
					// setQuestion(data);
					dispatch({ type: 'FETCH_SUCCESS', payload: { question: {...data,id:Number(data.id)} } });
					
				} catch (error: unknown) {
					if (error instanceof Error) {
						// setIsError(error.message)
						dispatch({ type: 'FETCH_ERROR', payload: error.message });
						// console.log('Fetch error: ',state)
					}
				}
			}
		}
		// setIsError("");
		// setIsPending(true);
		dispatch({ type: "FETCH_START" });
		setTimeout(getQuestion, 1500);
		// setIsPending(false);
	}, [state.id, lessonName, state.length]);

	// return { id, setId, question, length: questionNumber, isError, isPending }
	return {
		setId, ...state
	}


}

export default useFetchQuestion;