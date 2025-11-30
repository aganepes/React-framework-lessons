export type TLogin = {
	email: string;
	password: string;
}
export type TUser = {
	id: number;
	name: string;
	email: string;
	password: string;
}

const DBUsers: TUser[] = [];

export type TApiRegister = { token: string, user: TUser } | undefined;
export function ApiRegister(user: Omit<TUser, "id">): Promise<TApiRegister> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (DBUsers.findIndex(u => u.email == user.email) != -1) {
				const User = { id: DBUsers.length, name: user.name, email: user.email, password: user.password };
				DBUsers.push(User);
				resolve({ user: User, token: `User-token-${User.id}` });
			} else {
				reject("You are registered");
			}
		}, 2000)

	})
}

export type TApiLogin = { token: string, user: Omit<TUser, "password" | "email"> } | undefined;
export function ApiLogin(user: TLogin): Promise<TApiLogin> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const User = DBUsers.find(u => u.email == user.email);
			if (User && User.password == user.password) {
				resolve({
					token: `User-token-${User.id}`,
					user: { id: User.id, name: User.name }
				})
			} else {
				reject("Email and password incorrect")
			}
		}, 2000)
	})
}