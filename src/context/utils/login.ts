const toLoading = ():Promise<boolean> => {
	return new Promise((res) => {
		setTimeout(() => {
			res(true)
		}, 2000);
	})
}
type TUserData = {
	name:string,
	email?:string;
	password:string
}
type TUser = TUserData & {id:number};

const data:TUser[] = [];

export const mockLogin = async (user:TUserData):Promise<{success:boolean,message:string,userId?:number}>=>{
	await toLoading();
	const finedUser = data.find(d=>d.name==user.name)
	if(finedUser && finedUser.password===user.password){
		return {success:true,message:"This is found",userId:finedUser.id}
	}else{
		return {success:false,message:"This is found"}
	}
}

let userId:number = -1;
export const mockRegister = async (user:TUserData):Promise<TUser & {success:boolean}>=>{
	await toLoading();
	await toLoading();
	userId++;
	const newUser = {...user,id:userId};
	data.push(newUser);

	return {...newUser,success:true};
	
}
export const mockLogout = async (id:number):Promise<void>=>{
	await toLoading();
	data.filter(d=>d.id===id);
}

