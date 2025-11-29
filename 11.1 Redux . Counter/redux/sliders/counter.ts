import { createSlice } from "@reduxjs/toolkit";


const counterReducer = createSlice({
	name:"counter",
	initialState:{value:0},
	reducers:{
		increment:(state)=>{state.value++},
		decrement:(state)=>{state.value--},
		reset:(state,{payload}:{payload:number})=>{state.value=payload}
	}
});


export const {increment,decrement,reset} = counterReducer.actions;
export default counterReducer.reducer