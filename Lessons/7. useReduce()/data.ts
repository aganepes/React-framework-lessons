export interface todoType {
	id:string;
	title:string;
	completed:boolean
}

const TodosData:todoType[] = [
	{
		id:"1",
		title:"Men taýýar.",
		completed:true
	},
	{
		id:"2",
		title:"Men taýýar däl.",
		completed:false
	}
]

export default TodosData;