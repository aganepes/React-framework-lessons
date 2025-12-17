import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { IQuestion } from '../types';

const answerTheme = {
	correct: "border-green-600 text-green-800 shadow-green-600 shadow-lg font-[500]",
	error: "border-red-600 text-red-600 shadow-red-600 shadow-lg font-[500]",
	default: [
		'w-full border border-transparent rounded-sm bg-quiz_white py-1 text-sm shadow-sm cursor-pointer text-gray-600 transition-all ease-in-out delay-100 hover:text-gray-900 ',
		'w-full border border-transparent rounded-sm bg-green_bg py-1 text-gray-600 text-sm shadow-sm shadow-gray-600 cursor-pointer transition-all ease-in-out delay-100 hover:text-gray-900 ']
}

type Props = { question: IQuestion, setResult: Dispatch<SetStateAction<boolean[]>>, setId: (id: number) => void };

function TrueFalse(props: Props) {
	const [themeClass, setThemeClass] = useState<string[]>(answerTheme.default);
	const [isFirstCheck, setIsFirstCheck] = useState<boolean>(false);

	useEffect(() => {
		setThemeClass(answerTheme.default);
		setIsFirstCheck(false);
	}, [props.question.id]);

	const handleClick = function (index: number): void {
		if (isFirstCheck) return;

		const answer = index == 0;
		const isCorrect = answer == props.question.correctAnswer;

		props.setResult((r) => r.concat(isCorrect));

		const classList = [...answerTheme.default];
		if (isCorrect) {
			classList[index] = answerTheme.correct;
		} else {
			classList[index] = answerTheme.error;
		}
		setThemeClass(classList);
		setIsFirstCheck(true);
		setTimeout(() => props.setId(props.question!.id + 1), 1000);
	}

	return (
		<div className='flex-1 flex flex-col px-2'>
			<h5 className='h-[3rem]'>{props.question.question}</h5>
			<div className="flex-1 flex flex-col gap-4 justify-center">
				<button className={answerTheme.default[0] + themeClass[0]} onClick={() => handleClick(0)}>True</button>
				<button className={answerTheme.default[1] + themeClass[1]} onClick={() => handleClick(1)}>False</button>
			</div>
		</div>
	)
}

export default TrueFalse;