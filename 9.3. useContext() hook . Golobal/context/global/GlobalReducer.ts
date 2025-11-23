import type { GlobalAction, GlobalState } from "./GlobalTypes";


const globalReducer = (state: GlobalState, action: GlobalAction): GlobalState => {

	switch (action.type) {
		case "TOGGLE_THEME":
			return {
				...state,
				theme: state.theme == "dark" ? "light" : "dark",
			}
		case "CHANGE-LANG":
			return {
				...state,
				lang: action.payload || "en"
			}
		case "START-LOGIN":
			return {
				...state,
				auth: {
					isLoggedIn: false,
					status: "loading"
				}
			}
		case "LOGIN":
			return {
				...state,
				user: {...action.payload},
				auth: {
					isLoggedIn: true,
					status: "success"
				}
			}
		case "LOGIN-ERROR":
			return {
				...state,
				user: null,
				auth: {
					isLoggedIn: false,
					status: "error"
				}
			}
		case "REGISTER": 
			// connect to backend
			return {
				...state,
				auth: {
					isLoggedIn: true,
					status: "success"
				},
				user: {...action.payload}
			}
		
		case "LOGOUT":
			return {
				...state,
				auth: {
					isLoggedIn: false,
					status: "idle"
				},
				user: null
			}
		
		default:
			return state
	}
}
export default globalReducer;