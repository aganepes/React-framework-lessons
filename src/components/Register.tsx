import { useContext, useState } from 'react'
import type { GlobalContextProps} from '../context/GlobalTypes';
import { GlobalContext } from '../context/GlobalContext';

function Register(props: { setVisibleLogin: (is:boolean)=>void }) {
	const { dispatch } = useContext<GlobalContextProps | null>(GlobalContext)!;
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [errorPassword , setErrorPassword] = useState<boolean>(false);
	const handleRegister = () => {
		dispatch({
				type: "LOADING-AUTH",
				payload: {
					auth: { isLoggedIn: false, status: "loading" }
				}
			});
		if (password != confirmPassword) {
			setErrorPassword(true);
			setConfirmPassword("");
			dispatch({
				type: "ERROR-AUTH",
				payload: {
					auth: { isLoggedIn: false, status: "idle" },
					user:null,
					registerStatus:"none"
				}
			});
			return;
		}
		dispatch({
			type: "REGISTER",
			payload: {
				user: { name, email, password }
			}
		});
	}

	return (<>
		<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
			<div style={{ display: "inline" }}>
				<label htmlFor="name">Name:</label>
				<input type="text" id="name" placeholder='Name'
					defaultValue={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div style={{ display: "inline" }}>
				<label htmlFor="email">Email:</label>
				<input type="text" id="email" placeholder='Email'
					defaultValue={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div style={{ display: "inline" }}>
				<label htmlFor="password">Password:</label>
				<input type="text" id="password" placeholder='Password'
					defaultValue={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div style={{ display: "inline" }}>
				<label htmlFor="confirm">Confirm password:</label>
				<input type="password" id="confirm" placeholder='Confirm password'
					style={errorPassword ? {border:"1px solid red",marginBottom:"0"} : {border:"none",marginBottom:"1.4rem"}}
					defaultValue={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</div>
			{errorPassword && <p style={{color:'yellowgreen'}}>Confirm password error</p>}
			<button onClick={handleRegister} style={{ width: '150px', padding: "5px 10px" }}>Register</button>
			<p onChange={()=>props.setVisibleLogin(true)}>To Login</p>
		</div>
	</>
	)
}

export default Register;