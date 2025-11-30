import { configureStore } from "@reduxjs/toolkit";
import AuthReduce from './features/auth/slide';
import { TState as TAuthState } from './features/auth/slide';

export type TStore ={
	auth:TAuthState
}
export const store = configureStore({
	reducer:{
		auth:AuthReduce
	}
})