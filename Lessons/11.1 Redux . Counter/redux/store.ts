import {configureStore} from "@reduxjs/toolkit";
import CounterReducer  from "./sliders/counter";

export type TState={
	counter:{value:number}
}


const stores = configureStore<TState>({
	reducer:{
		counter:CounterReducer
	}
});
export default stores;