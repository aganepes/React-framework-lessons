import { useContext, useState } from 'react'
import type { GlobalContextProps } from '../context/GlobalTypes';
import { GlobalContext } from '../context/GlobalContext';

function Register(props: { setVisibleLogin: (is: boolean) => void }) {
	const { dispatch } = useContext<GlobalContextProps | null>(GlobalContext)!;
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleLogin = () => {
		dispatch({
			type: "LOADING-AUTH",
			payload: {
				auth: { isLoggedIn: false, status: "loading" }
			}
		});
		if (name.includes("@")) {
			dispatch({
				type: "LOGIN",
				payload: {
					user: { email: name, password }
				}
			});
			return;
		}
		dispatch({
			type: "LOGIN",
			payload: {
				user: { name, password }
			}
		});
	}

	return (<>
		<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
			<div style={{ display: "inline" }}>
				<label htmlFor="name">Name/Email:</label>
				<input type="text" id="name" placeholder='Name or Email'
					defaultValue={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div style={{ display: "inline" }}>
				<label htmlFor="password">Password:</label>
				<input type="text" id="password" placeholder='Password'
					defaultValue={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button onClick={handleLogin} style={{ width: '150px', padding: "5px 10px" }}>Login</button>
			<p onChange={() => props.setVisibleLogin(true)}>To Login</p>
		</div>
	</>
	)
}

export default Register;