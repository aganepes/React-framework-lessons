import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {result:boolean[],setPageName: Dispatch<SetStateAction<string>> };

const App = (props:Props) => {

	const [result,setResult ] = useState<number>(100);

	useEffect(()=>{
		const correctNumber = props.result.filter((r)=>r).length;
		const present = Math.round(correctNumber*100/props.result.length);
		setResult(present);
	},[]);

	return (
			<div className="w-[300px] bg-white p-4 rounded-2xl">
				<div className="flex flex-col items-center gap-4 p-2">
					<h1 className="text-4xl font-serif">Result</h1>
				<div className={`w-30 h-30 flex justify-center items-center rounded-full bg-conic from-cyan-900 from-${result}% to-gray-300 to-${100-result}%`}>
					<div className="w-26 h-26 bg-white flex justify-center items-center rounded-full">
					<span className="text-xl text-amber-700">{props.result.filter((r)=>r).length}&nbsp;/&nbsp;{props.result.length}</span>
					</div>
				</div>
					<p className="text-center leading-4">You got <span className="text-emerald-900"> {result}% </span>of the answers correct. <br /> Congratulations!</p>
				</div>
				<div className="py-4 px-2">
					<button className="px-2 py-1 bg-yellow-600 text-white font-serif rounded-sm cursor-pointer" style={{float:'right'}} onClick={()=>props.setPageName('')}>Finish</button>
				</div>
			</div>
	)
}

export default App;
