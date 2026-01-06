import { create } from 'zustand';

interface ICounterActions {
	increment: (by: number) => void;
	decrement: (by: number) => void;
	updateCount: (resetNumber: number) => void;
}
interface ICounterState {
	count: number;
}
export type TCounterStore = ICounterActions & ICounterState; 

export const useCounterStore = create<TCounterStore>((set) => ({
	count: 0,
	increment: (by:number) => set((state) => ({ count: state.count + by })),
	decrement: (by:number) => set((state) => ({ count: state.count - by })),
	updateCount: (resetNumber:number) => set({ count:resetNumber })
}));

