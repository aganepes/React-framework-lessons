import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Home: React.FC = () => {
	const navigate = useNavigate();
	console.log("HOme")
	return (
		<>
			<Nav />
			<h2>Home page</h2>
			<button onClick={() => navigate('/contact')}>Go to Contact</button>
		</>
	)
}

export default Home;