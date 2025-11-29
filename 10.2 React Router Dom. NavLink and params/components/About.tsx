import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import styles from '../styles/App.module.css';
import Nav from './Nav';

const About: React.FC = () => (
	<>
		<Nav />
		<h2>About Page</h2>
		<nav>
			<ul>
				<li>
					<NavLink to="team"
						className={({ isActive }) => isActive ? "" : ""}
						style={({ isActive }) => isActive ?
							{ color: "red" } : { color: "black" }}
					>Out Team</NavLink>
				</li>
				<li>
					<NavLink to="company" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>
						{({ isPending }) => isPending ? 'Our Company...' : "Our Company"}
					</NavLink>
				</li>
			</ul>
		</nav>
		<Outlet />
	</>
)

export default About;