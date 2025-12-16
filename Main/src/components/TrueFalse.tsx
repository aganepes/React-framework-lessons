import  { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IQuestion } from '../types';

	const answerTheme={
		correct:"border-green-600 text-green-800 shadow-green-600 shadow-lg font-[500]",
		error:"border-red-600 text-red-600 shadow-red-600 shadow-lg font-[500]",
		default:['w-full border border-transparent rounded-sm bg-quiz_white py-1 text-sm shadow-sm cursor-pointer text-gray-600 transition-all ease-in-out delay-100 hover:text-gray-900','w-full border border-transparent rounded-sm bg-green_bg py-1 text-gray-600 text-sm shadow-sm shadow-gray-600 cursor-pointer transition-all ease-in-out delay-100 hover:text-gray-900']
	}

type Props = { question: IQuestion, setResult: Dispatch<SetStateAction<boolean[]>>, setId: (id: number) => void };

function TrueFalse(props:Props) {
	const [question, setQuestion] = useState<null | IQuestion>(null);
		const [answer, setAnswer] = useState<boolean | null>(null);
		const [themeClass, setThemeClass] = useState<string[]>(answerTheme.default);
		const [isFirstCheck,setIsFirstCheck] = useState<boolean>(false);
	
		useEffect(() => {
			setQuestion(props.question);
		}, []);

		useEffect(()=>{
			if(question){
				setTimeout(()=>{
					setThemeClass(answerTheme.default);
					setIsFirstCheck(false);
					props.setId(question.id+1);
				},1000);
			}
		},[answer, props, question]);

		const handleClick = function (index: number): void {
			if (question?.options && !isFirstCheck) {
				setAnswer(index==0 ? true : false);
				setIsFirstCheck(true);
				const classList = themeClass;
				for (let i = 0; i < 2; i++) {
					if (index==i) {
						if (answer == question.correctAnswer){
							classList[i] = answerTheme.correct;
							props.setResult((r)=>r.concat(true));
						}else{ 
							classList[i] = answerTheme.error;
							props.setResult((r)=>r.concat(false));
						}
					} else {
						classList[i] = answerTheme.default[i];
					}
				}
				setThemeClass(classList);
			}else{
				setThemeClass(answerTheme.default);
			}
		}
	return (
		<div className='flex-1 flex flex-col px-2'>
			<h5 className='h-[3rem]'>{question ? question.question : ""}</h5>
			<div className="flex-1 flex flex-col gap-4 justify-center">
				<button className={themeClass[0]} onClick={()=>handleClick(0)}>True</button>
				<button className={themeClass[1]} onClick={()=>handleClick(1)}>False</button>
			</div>
		</div>
	)
}

export default TrueFalse