import React from 'react'
import { useCounterStore } from './store';
import './index.css';

function App() {
	const count = useCounterStore((state) => state.count);
	const increment = useCounterStore((state) => state.increment);
	const decrement = useCounterStore((state) => state.decrement);
	const updateCount  = useCounterStore((state) => state.updateCount);
	return (
		<>
			<h1 className='title'>Zustand state management</h1>
			<p className='counter'>{count}</p>
			<div className="buttons">
				<button className='button increment' onClick={()=>increment(1)}>Increment</button>
				<button className='button reset' onClick={() => updateCount(0)}>Reset</button>
				<button className='button decrement' onClick={()=>decrement(1)}>Decrement</button>
			</div>
		</>
	)
}

export default App;