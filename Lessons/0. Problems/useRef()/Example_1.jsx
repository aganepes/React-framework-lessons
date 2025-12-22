/* 1. Odaklanma ve Input Yönetimi (DOM Erişimi)
Bu en klasik örnektir. Bir butona tıklandığında sayfadaki belirli bir input alanına otomatik olarak odaklanılmasını sağlarız.
*/

import { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
		console.log(inputRef.current);
    inputRef.current.style.backgroundColor = "#f0f0f0";
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="This focus..." />
      <button onClick={handleClick}>Focus to Input </button>
    </div>
  );
}
export default FocusInput;