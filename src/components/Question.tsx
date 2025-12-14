
import MultipleChoice from "./MultipleChoice";
import FillBlack from "./FillBlack";
import TrueFalse from "./TrueFalse";
import Result from './Result';
import React, { ReactNode, useEffect, useState } from 'react'
import useFetchQuestion from '../hooks/useFetch';
import LoadingImage from '../assets/loading.png';

function App(props: { pageName: string }) {
	const { question, length, id, isError, isPending, setId } = useFetchQuestion(props.pageName);
	const [time, setTime] = useState<number>(0);
	const [isFinal, setIsFinal] = useState<boolean>(false);
	const [result, setResult] = useState<boolean[]>([]);

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setTime((time) => time + 1);
			if (time > 20) {
				setId(id + 1);
				clearTimeout(timeOut);
			}
		}, 1000);
	}, [id, setId, time]);

	useEffect(() => {
		if (id == length) {
			setIsFinal(true)
		}
	}, [id, length]);

	const SwitchElement = (): ReactNode => {
		switch (question?.type) {
			case "fill_blank":
				return <FillBlack question={question} setResult={setResult} setId={setId} />
			case "multiple_choice":
				return <MultipleChoice question={question} setResult={setResult} setId={setId} />
			case "true_false":
				return <TrueFalse question={question} setResult={setResult} setId={setId} />
			default:
				return <></>
		}
	}

	return (<div className="w-full h-[100vh] flex justify-center items-center select-none">
		<div className="w-[25rem] h-[25rem] rounded-bl-4xl rounded-tr-4xl shadow-2xl shadow-gray-600 bg-container_bg p-2 flex flex-col gap-5">
			<div className="flex justify-between border-b p-3 border-[#B779B9] px-3">
				<h4 className="text-quiz_text-800 font-medium text-2xl">Quiz</h4>
				<button className="bg-time-bg border-2 border-gray-700 rounded-sm py-2 px-6 text-quiz_white text-sm">Time: <span className="text-time_text_bg p-0.5 ml-1 font-bold">&nbsp;{time}&nbsp;</span></button>
			</div>
			<div className="w-full flex-1 flex">
				{
					!isFinal
						? (
							<>
								{
									(isError && !isPending) && <div className="w-full flex justify-center items-center text-rose-700 text-center">
										<h1>{isError}</h1>
									</div>
								}
								{
									(isPending && !isError) && (<div className="w-full flex-1 flex justify-center items-center backdrop-blur-2xl animate-spin">
										<img src={LoadingImage} alt="Loading image" width={50} />
									</div>)
								}
								{(!isPending && !isError) && SwitchElement()}
							</>
						)
						: <Result result={result} />
				}
			</div>
			<div className="flex justify-between border-t p-3 border-[#B779B9]">
				<p>
					<span className="bg-quiz_number_bg p-1 px-2.5  rounded-full">{id}</span> of <span className="bg-quiz_number_bg p-1 px-2.5  rounded-full ml-0.5">{length}</span> Question
				</p>
				<button className="bg-red_bg px-4 py-0.5 rounded-sm text-quiz_white cursor-pointer border border-transparent hover:text-quiz_text-800 transition-colors delay-100 ease-in-out hover:bg-quiz_white hover:border-quiz_text-600 active:text-red_bg active:border-red_bg" onClick={() => { setId(id + 1)}}>{!isFinal ? " Next " : "Result"}</button>
			</div>
		</div>
	</div>)
}

export default App;
