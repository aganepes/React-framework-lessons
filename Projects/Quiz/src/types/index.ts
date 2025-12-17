export interface IQuestion {
	id: number,
	type: "multiple_choice" | "true_false" | "fill_blank",
	question: string,
	options?: string[],
	correctAnswer: string | boolean 
}