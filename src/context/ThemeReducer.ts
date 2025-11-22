import type { ThemeAction, ThemeState } from "../types/theme";

export  const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
	switch (action.type) {
		case "TOGGLE_THEME":
			return {
				...state,
				theme: state.theme == "dark" ? "light" : "dark",
			}
		default :
			return state
	}
}