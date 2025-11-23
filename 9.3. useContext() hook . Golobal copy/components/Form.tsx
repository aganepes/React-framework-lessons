import { useContext, useState } from 'react'
import type { GlobalContextProps } from '../context/global/GlobalTypes';
import { GlobalContext } from '../context/global/GlobalContext';
import Login from './Forms/Login';
import Register from './Forms/Register';

function LoginForm() {
	const [visibleLogin, setVisibleLogin] = useState<boolean>(false);
	const { state } = useContext<GlobalContextProps | null>(GlobalContext)!;

	return (
		// style={{ position: "relative" }}
		<div >
			{state.auth.status == "loading" ?
				// style={{ color: "royalblue", position: "absolute", top: "40px", left: "-50%" }}
				<div>
					<h2> Loading ...</h2>
				</div>
				:
				<div>
					{!state.auth.isLoggedIn &&
						(visibleLogin ?
						<>
							<h3> Login </h3>
							<Login setVisibleLogin={setVisibleLogin} />
						</>
						:
						<>
							<h3>Register</h3>
							<Register setVisibleLogin={setVisibleLogin} />
						</>)
					}
				</div>
			}
		</div>
	)
}

export default LoginForm