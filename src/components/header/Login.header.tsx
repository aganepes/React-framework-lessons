import { useContext } from 'react'
import { GlobalContext } from '../../context/global/GlobalContext';
import type { GlobalContextProps } from '../../context/global/GlobalTypes';

function LoginHeader() {
	const { state, dispatch } = useContext<GlobalContextProps | null>(GlobalContext)!;
	return (
		<div>
			{state.auth.isLoggedIn ?
				<div style={{ display: "inline" }}>
					<p style={{ color: "teal", marginRight: "10px" }}>
						{state.user?.name + " are " } logged in.</p>
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