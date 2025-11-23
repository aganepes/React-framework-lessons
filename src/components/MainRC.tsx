import LoginHeader from "./LoginHeader";
import LoginForm from "./Form";
import LangHeader from "./LangHeader";
import Theme from "./Theme";
import Footer from "./Footer";


function MainComponent() {

	return (
		<>
			<header>
				<h1>App Component</h1>
				<LoginHeader />
				<LangHeader />
			</header>
			<main>
				<Theme />
				<LoginForm />
			</main>
			<Footer companyName="Häzirki zaman okuw merkezi"/>
		</>
	)
}

export default MainComponent;