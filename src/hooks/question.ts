import { IQuestion } from "../types";

export interface QState {
	id: number
	question: IQuestion | null
	length: number
	isPending: boolean
	isError: string | null
}

type Action =
	| { type: "SET_ID"; payload: number }
	| { type: "FETCH_START" }
	| { type: "FETCH_SUCCESS"; payload: { question?: IQuestion; length?: number } }
	| { type: "FETCH_ERROR"; payload: string }

export const initialState: QState = {
	id: 1,
	question: null,
	length: 0,
	isPending: false,
	isError: null
}

export const questionReducer = function (state: QState, action: Action): QState {
	switch (action.type) {
		case "SET_ID":
			return { ...state, id: action.payload, question: state.question }
		case "FETCH_START":
			return { ...state, isPending: true, isError: null }
		case "FETCH_SUCCESS":
			return {
				...state,
				question: action.payload.question ? action.payload.question : state.question,
				length: action.payload.length ? action.payload.length : state.length,
				isPending: false, isError: null
			}
		case "FETCH_ERROR":
			return { ...state, isPending: false, isError: action.payload }
		default:
			return state;
	}
}