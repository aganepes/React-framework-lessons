import { useContext, useState } from 'react'
import type { GlobalContextProps } from '../../context/global/GlobalTypes';
import { GlobalContext } from '../../context/global/GlobalContext';
import { mockLogin } from '../../context/utils/Login';

function Register(props: { setVisibleLogin: (is: boolean) => void }) {
	const { dispatch } = useContext<GlobalContextProps | null>(GlobalContext)!;
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleLogin = async () => {
		dispatch({ type: "START-LOGIN" });


		const resp = await mockLogin({ name, password });
		if (resp.success) {
			dispatch({
				type: "LOGIN",
				payload: { id: resp.userId!, name, email: name, password }
			});
		} else {
			dispatch({ type: "LOGIN-ERROR" });
		}


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
			<p onClick={() => props.setVisibleLogin(false)}>To Register</p>
		</div>
	</>
	)
}

export default Register;