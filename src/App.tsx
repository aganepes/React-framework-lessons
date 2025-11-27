import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from './redux/slices/couter'

export default function App() {
  const count = useSelector((state) => (state as {counter:{value:string}}).counter.value)
  const dispatch = useDispatch()

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  )
}
