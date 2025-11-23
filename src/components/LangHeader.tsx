import { useContext } from 'react'
import Content from "../contents/lang";
import { GlobalContext } from '../context/GlobalContext';
import type { GlobalContextProps } from '../context/GlobalTypes';

function LangHeader() {
	const { state, dispatch } = useContext<GlobalContextProps | null>(GlobalContext)!;

	return (
		<div style={{ display: "flex", gap: "1rem" }}>
			<p style={{ color: "chartreuse" }}>Current lang: {Content.langName[state.lang]}</p>
			<div style={{ display: "flex", gap: ".5rem", padding: "5px" }}>
				<button onChange={() => dispatch({ type: "CHANGE-LANG", payload: { lang: "en" } })}>Eng</button>
				<button onChange={() => dispatch({ type: "CHANGE-LANG", payload: { lang: "ru" } })}>Rus</button>
				<button onChange={() => dispatch({ type: "CHANGE-LANG", payload: { lang: "tm" } })}>Türkmen</button>
			</div>
		</div>
	)
}

export default LangHeader