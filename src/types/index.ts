export interface IQuestion {
	id: string,
	type: "multiple_choice" | "true_false" | "fill_blank",
	question: string,
	options?: string[],
	correctAnswer: string | boolean 
}