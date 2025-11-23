import { useContext, type FC } from "react";
import { GlobalContext } from "./context/global/GlobalContext";
import LoginHeader from "./components/header/Login.header";
import LangHeader from "./components/header/Lang.header";
import Theme from "./components/Theme";
import LoginForm from "./components/Form";
import Footer from "./components/Footer";
import content from "./contents/lang";
import type { GlobalContextProps } from "./context/global/GlobalTypes";

const App: FC = () => {
	const { state } = useContext<GlobalContextProps | null>(GlobalContext)!;
	return (
		<div style={{ padding: "20px" }}>
			<h1>{content["context-title"][state.lang]}</h1>
			<header>
				<h1>{content["app-comp"][state.lang]}</h1>
				<LoginHeader />
				<LangHeader />
			</header>
			<main>
				<Theme />
				<LoginForm />
			</main>
			<Footer companyName="Häzirki zaman okuw merkezi" />
		</div>
	)
}
export default App;