import { useContext } from 'react'
import Content from "../../contents/lang";
import { GlobalContext } from '../../context/global/GlobalContext';
import type { GlobalContextProps } from '../../context/global/GlobalTypes';

function LangHeader() {
	const { state, dispatch } = useContext<GlobalContextProps | null>(GlobalContext)!;
	return (
		<div style={{ display: "flex", gap: "1rem" }}>
			<p style={{ color: "chartreuse" }}>Current lang: {Content.langName[state.lang] || "en"}</p>
			<div style={{ display: "flex", gap: ".5rem", padding: "5px" }}>
				<button onClick={() => dispatch({ type: "CHANGE-LANG", payload: "en" })}>Eng</button>
				<button onClick={() => dispatch({ type: "CHANGE-LANG", payload: "ru" })}>Rus</button>
				<button onClick={() => dispatch({ type: "CHANGE-LANG", payload: "tm" })}>Türkmen</button>
			</div>
		</div>
	)
}

export default LangHeader