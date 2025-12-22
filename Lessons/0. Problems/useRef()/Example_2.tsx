/*
2. Kronometre (Render'dan Bağımsız Değer Tutma)
State (useState) her değiştiğinde bileşen yeniden render edilir. Ancak useRef ile tutulan bir değer değiştiğinde render tetiklenmez. Bu, interval (zamanlayıcı) ID'lerini saklamak için mükemmeldir.

*/
import { useState, useRef } from 'react';

function StopWatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const timerRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(timerRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <div>
      <h1>Elapsed Time: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}
export default StopWatch;