import "./styles/App.css";

import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom"
import React from "react";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Users from './components/Users';
import User from './components/User';
import NotFound from './components/NotFound';


const Team: React.FC = () => <h2>Team Page</h2>;
const Company: React.FC = () => <h2>Company Page</h2>;

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* path="/" */}
				<Route index element={<Home />} />
				<Route path="/about" element={<About />}>
					<Route path="team" element={<Team />} />
					<Route path="company" element={<Company />} />
				</Route>
				<Route path="/contact" element={<Contact />} />
				<Route path="/users" element={<Users />}>
					<Route path=":id" element={<User />} />
				</Route>
				<Route path="*" element={<NotFound/>} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;