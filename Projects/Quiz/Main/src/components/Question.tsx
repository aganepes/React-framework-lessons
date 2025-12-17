
import MultipleChoice from "./MultipleChoice";
import FillBlack from "./FillBlack";
import TrueFalse from "./TrueFalse";
import Result from './Result';
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import useFetchQuestion from '../hooks/useFetch';
import LoadingImage from '../assets/loading.svg';

const timeNumber = 20;
function App(props: { pageName: string, setPageName: Dispatch<SetStateAction<string>> }) {

	const { question, length, id, isError, isPending, setId } = useFetchQuestion(props.pageName);
	const [time, setTime] = useState<number>(-2);
	const [result, setResult] = useState<boolean[]>([]);
	const [isFinal, setIsFinal] = useState<boolean>(false);

	useEffect(() => {
		// Start the timer when isFinal is true. isFinal is true when id > length. 
		// Prevent this useEffect from running if length is zero or if there is an isError.

		// finally adjust the time and go to the final page
		if(id>length && length){
			setTime(-2);
			setIsFinal(true);
		}

		if (!length || isError || isFinal || id>length) return;
		
		// Every time we change ID, we have to start over.
		setTime(-2);

		const interval = setInterval(() => {
			setTime((prevTime) => {
				const newTime = prevTime + 1;
				// Timeout control
				if (newTime > timeNumber) {
					// Automatically recorded as incorrect upon timeout
					setResult((r) => r.concat(false));
					// If we're not on the last question
					if (id < length) {
						setId(id + 1);
						// Reset the timer and start a new round
						return 0;
					} else {
						// The last question is to stop the timer and set isFinal to proceed to the result.
						clearInterval(interval);
						setIsFinal(true);
						// Leave time as it is
						return newTime;
					}
				}
				// Increase the time
				return newTime;
			});
		}, 1000);

		// Cleanup: Always stop when a component is detached or dependencies change.
		return () => {
			clearInterval(interval);
		}
		// Restart the timer when id, length, or isFinal changes
	}, [id, length, isError, isFinal]);

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

	const NextButton = () => {
		setResult(r => r.concat(false));
		setId(id + 1);
		setTime(0);
	};

	return (<div className="w-full h-[100vh] flex justify-center items-center select-none">
		{
			!isFinal
				? (<div className="w-[25rem] h-[25rem] rounded-bl-4xl rounded-tr-4xl shadow-2xl shadow-gray-600 bg-container_bg p-2 flex flex-col gap-5">
					<div className="flex justify-between border-b p-3 border-[#B779B9] px-3">
						<h4 className="text-quiz_text-800 font-medium text-2xl">Quiz</h4>
						<button className="bg-time-bg border-2 border-gray-700 rounded-sm py-2 px-6 text-quiz_white text-sm">Time: <span className="text-time_text_bg p-0.5 ml-1 font-bold">&nbsp;{time}&nbsp;</span></button>
					</div>
					<div className="w-full flex-1 flex">
						{
							(isError && !isPending) && <div className="w-full flex justify-center items-center text-rose-700 text-center">
								<h1>{isError}</h1>
							</div>
						}
						{
							(isPending && !isError) && (<div className="w-full flex-1 flex justify-center items-center backdrop-blur-2xl">
								<img src={LoadingImage} className="animate-spin" alt="Loading image" width={50} />
							</div>)
						}
						{(!isPending && !isError) && SwitchElement()}

					</div>
					<div className="flex justify-between border-t p-3 border-[#B779B9]">
						<p>
							<span className="bg-quiz_number_bg p-1 px-2.5  rounded-full">{id}</span> of <span className="bg-quiz_number_bg p-1 px-2.5  rounded-full ml-0.5">{length}</span> Question
						</p>
						<button className="bg-red_bg px-4 py-0.5 rounded-sm text-quiz_white cursor-pointer border border-transparent hover:text-quiz_text-800 transition-colors delay-100 ease-in-out hover:bg-quiz_white hover:border-quiz_text-600 active:text-red_bg active:border-red_bg"
							onClick={NextButton}
							disabled={isError ? true : false}
						>
							{!isFinal ? "Next" : "Result"}
						</button>
					</div>
				</div>
				)
				: <Result result={result} setPageName={props.setPageName} />
		}
	</div>)
}

export default App;