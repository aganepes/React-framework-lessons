
export type TUserLogin = {
	email: string;
	password: string;
}
export type TUser = {
	id: number;
	name: string;
	email: string;
	password: string;
}

export type TUserData = Omit<TUser, "id">;

export type TApiRegister = { token: string, user: TUser } | undefined;

export function ApiRegister(user: TUserData): Promise<TApiRegister> {
	return new Promise((resolve, reject) => {
		setTimeout(async () => {
			let User: TUser;
			fetch('http://localhost:3000/User')
				.then(resp => resp.json())
				.then((data: TUser[]) => {
					const index = data.findIndex(u => u.email == user.email);
					if (index == -1) {
						User = {
							id: data.length,
							name: user.name,
							email: user.email,
							password: user.password
						};
						fetch('http://localhost:3000/User', { method: "post", body: JSON.stringify(User) })
							.then(() => console.log(User.name, " created."))
							.catch(() => reject("Server error"))
					} else {
						User = data[index];
					}
					resolve({ user: User, token: `token-${User.name}-${User.id}` });
				})
				.catch(() => reject("Server Error..."));
		}, 2000)
	})
}

export type TApiLogin = { token: string, user: Omit<TUser, "password"> } | undefined;

export function ApiLogin(user: TUserLogin): Promise<TApiLogin> {
	return new Promise((resolve, reject) => {
		setTimeout(async () => {
			try {
				const response = await fetch('http://localhost:3000/User');
				if (response.ok) {
					const users = await response.json() as TUser[];
					const User = users.find(u => u.email == user.email);
					if (!User) {
						reject("Email incorrect.");
					}
					if (User && User.password == user.password) {
						resolve({
							token: `token-${User.name}-${User.id}`,
							user: { id: User.id, name: User.name, email: User.email }
						})
					} else {
						reject("Password incorrect");
					}
				}
			} catch {
				reject("Server Error...");
			}

		}, 2000)
	})
}