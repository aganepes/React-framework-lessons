import { useContext, useEffect } from 'react'
import type { GlobalContextProps } from '../context/GlobalTypes';
import { GlobalContext } from '../context/GlobalContext';

function LoginHeader() {
	const { state, dispatch } = useContext<GlobalContextProps | null>(GlobalContext)!;
	useEffect(() => {
		dispatch({ type: "IS-LOGIN" });
	}, [dispatch]);
	return (
		<div>
			{state.auth?.isLoggedIn ?
				<div style={{ display: "inline" }}>
					<p style={{ color: "teal", marginRight: "10px" }}>
						{state.user?.name ? state.user.name + " are " : state.user?.email+ " is "} logged in.</p>
					<button onClick={() => dispatch({ type: "LOGOUT" })}>
						={'>'} Logout
					</button>
				</div>
				:
				<p style={{color:"orangered"}}>You are not logged in.</p>
			}
		</div>
	)
}

export default LoginHeader