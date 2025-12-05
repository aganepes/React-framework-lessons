import { createContext, useCallback, useState, type FC, type ReactNode } from "react";


export interface TState { 
	counter: number
	incrementCounter:()=>void;
	decrementCounter:()=>void;
	resetCounter:(n:number)=>void;
}
// eslint-disable-next-line react-refresh/only-export-components
export const CounterContext = createContext<TState|null>(null);

interface ProviderProps {
	children: ReactNode
}

export const CounterProvider: FC<ProviderProps> = ({ children }) => {
	const [counter, setCounter] = useState<number>(0);
	const incrementCounter = useCallback(()=>{
		setCounter((c)=>c+1);
	},[]);
	const decrementCounter = useCallback(()=>{
		setCounter((c)=>c-1);
	},[]);
	const resetCounter = useCallback((n:number)=>{
		setCounter(n);
	},[]);
	const value={counter,incrementCounter,decrementCounter,resetCounter};
	return (
		<CounterContext.Provider value={value}>
			{children}
		</CounterContext.Provider>
	)
}
