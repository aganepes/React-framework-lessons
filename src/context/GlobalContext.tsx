import { createContext, useReducer, type FC, type ReactNode } from "react";
import  { initialGlobalState,type GlobalContextProps} from "./GlobalTypes";
import  globalReducer  from "./GlobalReducer";


// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext<GlobalContextProps|null>(null);

interface GlobalProviderProps {
	children:ReactNode
}

export const GlobalProvider:FC<GlobalProviderProps> = ({children})=>{
	const [state,dispatch] = useReducer(globalReducer,initialGlobalState);
	const contextValue : GlobalContextProps = {state,dispatch};

	return (
		<GlobalContext.Provider value={contextValue}>
		{children}
		</GlobalContext.Provider>
	)
}