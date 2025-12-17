import { Dispatch, FC, SetStateAction, useState } from "react";
import mathLogo from '../assets/quiz_app/math_logo.jpg';
import englishLogo from '../assets/quiz_app/english_logo.jpg';
import pythonLogo from '../assets/quiz_app/python_logo.jpg';
import javascriptLogo from '../assets/quiz_app/javascript_logo.png';

type Props = { setPageName: Dispatch<SetStateAction<string>> }

const App = (props: Props) => {
	return (
		<div className="w-[90%] max-w-[750px]    shadow-2xl shadow-gray-600 p-10 pt-[8rem] flex flex-col sm:flex-row sm:justify-between gap-8 bg-[rgba(49,62,81,0.82)] rounded-2xl">
			<div className="">
				<h1 className="text-gray-300 font-[500] text-3xl">Welcome to the </h1>
				<h1 className="text-white font-bold text-3xl mb-4">Frontend Quiz!</h1>
				<span className="italic text-gray-400 text-[12px]">Pick a subject to get started</span>
			</div>
			<div className="flex-1 flex flex-col gap-2 font-[400] sm:items-end">
				<button className="w-full bg-[#3C4C67] rounded-lg text-white p-2 w-full flex items-end max-w-[250px] cursor-pointer border border-transparent hover:border-quiz_text-800 hover:shadow-sm hover:shadow-gray-800 transition-all delay-300 ease-in-out" onClick={() => props.setPageName('english')}>
					<img src={englishLogo} alt="English logo" width={30} className="rounded-sm" />
					<span className="ml-5 capitalize text-lg font-serif">English</span>
				</button>
				<button className="w-full bg-[#3C4C67] rounded-lg text-white p-2 w-full flex items-end max-w-[250px] cursor-pointer border border-transparent hover:border-quiz_text-800 hover:shadow-sm hover:shadow-gray-800 transition-all delay-300 ease-in-out" onClick={() => props.setPageName('math')}>
					<img src={mathLogo} alt="Math logo" width={30} className="rounded-sm" />
					<span className="ml-5 capitalize text-lg font-serif">Math</span>
				</button>
				<button className="w-full bg-[#3C4C67] rounded-lg text-white p-2 w-full flex items-end max-w-[250px] cursor-pointer border border-transparent hover:border-quiz_text-800 hover:shadow-sm hover:shadow-gray-800 transition-all delay-300 ease-in-out" onClick={() => props.setPageName('python')}>
					<img src={pythonLogo} alt="Python logo" width={35} className="rounded-sm" />
					<span className="ml-5 capitalize text-lg font-serif">Python</span>
				</button>
				<button className="w-full bg-[#3C4C67] rounded-lg text-white p-2 w-full flex items-end max-w-[250px] cursor-pointer border border-transparent hover:border-quiz_text-800 hover:shadow-sm hover:shadow-gray-800 transition-all delay-300 ease-in-out" onClick={() => props.setPageName('javascript')}>
					<img src={javascriptLogo} alt="Javascript logo" width={30} className="rounded-sm" />
					<span className="ml-5 capitalize text-lg font-serif">Javascript</span>
				</button>
			</div>
		</div>
	)
}

export default App;
