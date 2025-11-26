import "./styles/App.css";

import {
	BrowserRouter,
	Routes,
	Route
} from "react-router-dom"
import React, { useEffect, useTransition } from "react";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Users from './components/Users';
import User from './components/User';
import NotFound from './components/NotFound';


const Team: React.FC = () => <h2>Team Page</h2>;
const Company: React.FC = () => {
	// 
	return <h2>Company Page</h2>
};

const App: React.FC = () => {

	useEffect(() => {
		const intersection = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show');
				} else {
					entry.target.classList.remove('show');
				}
			})
		}, {});
		document.querySelectorAll('item')?.forEach(item=>intersection.observe(item));
	}, [])
	return (
		<div className="body">
			{
				Array(20).fill(1).map((_, i) => {
					return <div className="item" key={i}>
						<h3>Item {i}</h3>
					</div>
				})
			}
		</div>
	)
}

export default App;