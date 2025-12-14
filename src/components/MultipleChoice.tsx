import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IQuestion } from '../types'

const answerTheme = {
	correct: "w-full border rounded-sm bg-quiz_white py-1 text-sm  cursor-pointer border-green-600 text-black shadow-green-600 shadow-sm font-[500]",
	error: "w-full border rounded-sm bg-quiz_white py-1 text-sm border-red-600 text-black shadow-red-600 shadow-sm font-[500]",
	default: ['w-full border border-transparent rounded-sm bg-quiz_white py-1 text-sm shadow-sm cursor-pointer text-gray-600 transition-all ease-in-out delay-300 hover:text-gray-900', 'w-full border border-transparent rounded-sm bg-green_bg py-1 text-gray-600 text-sm shadow-sm shadow-gray-600 cursor-pointer transition-all ease-in-out delay-100 hover:text-gray-900', 'w-full border border-transparent rounded-sm bg-red_bg py-1 text-gray-600 text-sm shadow-sm shadow-gray-600 cursor-pointer transition-all ease-in-out delay-100 hover:text-gray-900', 'w-full border border-transparent rounded-sm bg-quiz_white py-1 text-gray-600 not-even:text-sm shadow-sm shadow-gray-600 cursor-pointer transition-all ease-in-out delay-100 hover:text-gray-900']
}

type Props = { question: IQuestion, setResult: Dispatch<SetStateAction<boolean[]>>, setId: (id: number) => void }

function MultipleChoice(props: Props) {
	const [question, setQuestion] = useState<null | IQuestion>(null);
	const [answer, setAnswer] = useState<string | null>(null);
	const [themeClass, setThemeClass] = useState<string[]>(['default', 'default', 'default', 'default'])

	useEffect(() => {
		setQuestion(props.question);
	}, [props.question, question]);

	const handleClick = function (index: number): void {
		if (question?.options) {
			setAnswer(question.options[index]);

			const classList = themeClass;
			for (let i = 0; i < question?.options.length; i++) {
				if (i + 1 == index) {
					if (answer == question.correctAnswer)
						classList[i] = answerTheme.correct;
					else 
						classList[i] = answerTheme.error;
				} else {
					classList[i] = answerTheme.default[i];
				}
			}
			setThemeClass(classList);
			setTimeout(()=>props.setId(question.id+1),1000);
		}
	}
	
	return (
		<div className='flex-1 flex flex-col px-2'>
			<h5 className='h-[3rem]'>{question ? question.question : ""}</h5>
			<div className="flex-1 flex flex-col gap-4 justify-stretch">
				<button
					className={themeClass[0]}
					onClick={() => handleClick(0)}>{question?.options ? question.options[0] : ""}</button>
				<button
					className={themeClass[1]}
					onClick={() => handleClick(1)}>{question?.options ? question.options[1] : ""}</button>
				<button
					className={themeClass[2]}
					onClick={() => handleClick(2)}>{question?.options ? question.options[2] : ""}</button>
				<button
					className={themeClass[3]}
					onClick={() => handleClick(3)}>{question?.options ? question.options[3] : ""}</button>
			</div>
		</div>
	)
}

export default MultipleChoice