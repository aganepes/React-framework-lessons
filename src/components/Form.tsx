import { useContext, useState } from 'react'
import type { GlobalContextProps } from '../context/GlobalTypes';
import { GlobalContext } from '../context/GlobalContext';
import Login from './Login';
import Register from './Register';

function LoginForm() {
	const [visibleLogin, setVisibleLogin] = useState<boolean>(false);
	const { state } = useContext<GlobalContextProps | null>(GlobalContext)!;

	return (
		<div style={{ position: "relative" }}>
			{!state.auth?.isLoggedIn && state.auth?.status == "loading" ?
				<div style={{ color: "royalblue", position: "absolute", top: "40px", left: "-50%" }}>
					<h2> Loading ...</h2>
				</div>
				:
				<div>
					{visibleLogin ?
						<>
							<h3> Login </h3>
							<Login setVisibleLogin={setVisibleLogin} />
						</>
						:
						<>
							<h3>Register</h3>
							<Register setVisibleLogin={setVisibleLogin} />
						</>
					}
				</div>
			}
		</div>
	)
}

export default LoginForm