import { FC } from "react";
import "./styles/App.css";

import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	useNavigate,
	Outlet
} from "react-router-dom"

const Home: React.FC = () => {
	const navigate = useNavigate();
	return (
		<>
			<h2>Home page</h2>
			<button onClick={() => navigate('/contact')}>Go to Contact</button>
		</>
	)
}
const About: React.FC = () => (
	<div>
		<h2>About Page</h2>
		<nav>
			<ul>
				<li>
					<Link to="team">Out Team</Link>
				</li>
				<li>
					<Link to="company">Our Company</Link>
				</li>
			</ul>
		</nav>
		<Outlet />
	</div>
)
const Contact: React.FC = () => {
	
	return (<>
		<h2>Contact Page</h2>

	</>
	)
}
const Team: React.FC = () => <h2>Team Page</h2>;
const Company: React.FC = () => <h2>Company Page</h2>;


const App: FC = () => {
	return (
		<BrowserRouter>
			<nav>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/about">About</Link></li>
					<li><Link to="/contact">Contact</Link></li>
				</ul>
			</nav>
			<Routes>
				{/* path="/" */}
				<Route index element={<Home />} />
				<Route path="/about" element={<About />}>
					<Route path="team" element={<Team />} />
					<Route path="company" element={<Company />} />
				</Route>
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</BrowserRouter>
	)
}
export default App;