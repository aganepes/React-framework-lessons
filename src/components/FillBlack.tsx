import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { IQuestion } from '../types'

	const answerTheme={
		correct:"flex-1 h-fit px-1.5 border-2 py-1 outline-0 transition-all ease-in-out delay-200 rounded-sm animate-error-input border-green-600shadow-sm shadow-green-600",
		error:"flex-1 h-fit px-1.5 border-2 py-1 outline-0 transition-all ease-in-out delay-200 rounded-sm animate-error-input border-red-500 shadow-sm shadow-red-500",
		default : "flex-1 h-fit px-1.5 border-2 border-transparent border-b-2 border-b-gray-800 rounded-none py-1 outline-0 focus:border-2 focus:border-gray-800 focus:rounded-sm transition-all ease-in-out delay-200 animate-error-input"
	}

type Props = { question: IQuestion, setResult: Dispatch<SetStateAction<boolean[]>>,setId:(id: number) => void }

function FillBlack(props:Props) {
	
	const [questionText , setQuestionText]  =useState<string>('');
	const [themeClass,setThemeClass] = useState<string>(answerTheme.default);
 	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(()=>{
		setQuestionText(props.question.question)
	},[props.question.question]);

	const handleClick =()=>{

		if(inputRef.current && inputRef.current?.value){
			setQuestionText((text)=>text.replace("__", inputRef.current!.value))
		}

		if(inputRef.current && inputRef.current.value.trim().toLowerCase()==(props.question.correctAnswer as string).toLowerCase()){
			props.setResult((result)=>result.concat(true));
			setThemeClass(answerTheme.correct);
			setTimeout(()=>props.setId(props.question.id+1),1000);
			return ;
		}

		if(inputRef.current && inputRef.current.value.trim().toLowerCase()!=(props.question.correctAnswer as string).toLowerCase()){
			props.setResult((result)=>result.concat(false));
			setTimeout(()=>props.setId(props.question.id+1),1000);
			setThemeClass(answerTheme.error);
			return;
		}

		setThemeClass(answerTheme.default);
	}

	return (
		<div className='flex-1 flex flex-col px-2'>
			<div className='flex-2'>
				<h5 className='font-[500] mt-4'>{questionText}</h5>
			</div>
			<div className="flex-1 flex gap-4 justify-between">
				<input type="text" className={themeClass} ref={inputRef}/>
				<button className='h-fit border border-transparent rounded-sm bg-quiz_white py-1 px-2 text-gray-600 not-even:text-sm shadow-sm shadow-gray-600 cursor-pointer transition-all ease-in-out delay-300 hover:text-black hover:border-black'  onClick={handleClick}>Check</button>
			</div>
		</div>
	)
}

export default FillBlack