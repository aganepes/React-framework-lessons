import type { GlobalAction, GlobalState } from "./GlobalTypes";

// const toLoading = ():Promise<boolean> => {
// 	return new Promise((res) => {
// 		setTimeout(() => {
// 			res(true)
// 		}, 2000);
// 	})
// }


const globalReducer = (state: GlobalState, action: GlobalAction): GlobalState => {
	
	switch (action.type) {
		case "TOGGLE_THEME":
			console.log(action)
			return {
				...state,
				theme: state.theme == "dark" ? "light" : "dark",
			}
		case "CHANGE-LANG":
			console.log("dff",action)
			return {
				...state,
				lang: action.payload?.lang || "en"
			}
		case "REGISTER": {
			// connect to backend
			const isRegister = true//await toLoading();

			if (isRegister) return {
				...state,
				auth: {
					isLoggedIn: true,
					status: "success"
				},
				user:{
					id:"1",
					name:action.payload?.user?.name,
					email:action.payload?.user?.email,
					password:action.payload?.user?.password
				},
				registerStatus:"register"
			}
			else return {
				...state,
				auth: {
					isLoggedIn: false,
					status: "error"
				},
				user:null,
				registerStatus:"none"
			}
		}
		case "LOGIN": {
			// connect to backend
			const isLogin = true//await toLoading();

			if (isLogin) return {
				...state,
				auth: {
					isLoggedIn: true,
					status: "success"
				},
				user:{
					name:action.payload?.user?.name,
					email:action.payload?.user?.email,
					password:action.payload?.user?.password
				},
				registerStatus:"register"
			}
			else return {
				...state,
				auth: {
					isLoggedIn: false,
					status: "error"
				},
				user:null,
				registerStatus:"none"
			}
		}
		case "LOGOUT":
			// connect to backend
			return {
				...state,
				auth: {
					isLoggedIn: true,
					status: "idle"
				},
				registerStatus:"none"
			}
		case "IS-LOGIN":
			// connect to backend
			return {
				...state,
				auth: {
					isLoggedIn: false,
					status: "idle"
				},
				registerStatus:"none"
			}
		case "LOADING-AUTH":
			// connect to backend
			//await toLoading()
			return {
				...state,
				auth: {
					isLoggedIn: false,
					status: "loading"
				}
			}
		case "ERROR-AUTH":
			// connect to backend
			//await toLoading()
			return {
				...state,
				auth: {
					isLoggedIn: false,
					status: "error"
				}
			}
		default:
			console.log(action)
			return state
	}
}
export default globalReducer;