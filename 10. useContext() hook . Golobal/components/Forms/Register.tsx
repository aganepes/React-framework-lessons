import { useContext, useState } from 'react'
import type { GlobalContextProps } from '../../context/global/GlobalTypes';
import { GlobalContext } from '../../context/global/GlobalContext';
import { mockRegister } from '../../context/utils/Login';

function Register(props: { setVisibleLogin: (is: boolean) => void }) {

	const { dispatch } = useContext<GlobalContextProps | null>(GlobalContext)!;

	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [errorPassword, setErrorPassword] = useState<boolean>(false);

	const handleRegister = async () => {
		dispatch({ type: "START-LOGIN" });

		if (password != confirmPassword) {
			setErrorPassword(true);
			setConfirmPassword("");
			dispatch({ type: "LOGIN-ERROR" });
			return;
		}
		setErrorPassword(false);
		await mockRegister({ name, email, password });

		dispatch({
			type: "REGISTER",
			payload: { name, email, password }
		});

		setPassword("");
		setEmail("");
		setConfirmPassword("")
		setName("");
	}

	return (<>
		<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
			<div style={{ display: "inline" }}>
				<label htmlFor="name">Name:</label>
				<input type="text" id="name" placeholder='Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div style={{ display: "inline" }}>
				<label htmlFor="email">Email:</label>
				<input type="text" id="email" placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div style={{ display: "inline" }}>
				<label htmlFor="password">Password:</label>
				<input type="text" id="password" placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div style={{ display: "inline" }}>
				<label htmlFor="confirm">Confirm password:</label>
				<input type="password" id="confirm" placeholder='Confirm password'
					style={errorPassword ? { border: "1px solid red", marginBottom: "0" } : { border: "1px solid gray", marginBottom: "1.4rem" }}
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</div>
			{errorPassword && <p style={{ color: 'yellowgreen' }}>Confirm password error</p>}
			<button onClick={async () => await handleRegister()} style={{ width: '150px', padding: "5px 10px" }}>Register</button>
			<p onClick={() => props.setVisibleLogin(true)}>To Login</p>
		</div>
	</>
	)
}

export default Register;