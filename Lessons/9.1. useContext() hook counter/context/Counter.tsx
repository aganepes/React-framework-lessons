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

export const CounterProvider: FC = ({ children }:ProviderProps) => {
	const [counter, setCounter] = useState<number>(0);
	
	const incrementCounter = ()=>{
		setCounter((c)=>c+1);
	};
	const decrementCounter = useCallback(()=>{
		setCounter((c)=>c-1);
	},[counter]);
	const resetCounter = useCallback((n:number)=>{
		setCounter(n);
	},[]);
	return (
		<CounterContext.Provider value={{counter,incrementCounter,decrementCounter,resetCounter}}>
			{children}
		</CounterContext.Provider>
	)
}
