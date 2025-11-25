import React from 'react'
import { Link } from 'react-router-dom';

const Nav: React.FC = React.memo(() => (<nav>
	<ul>
		<li><Link to="/">Home</Link></li>
		<li><Link to="/about">About</Link></li>
		<li><Link to="/contact">Contact</Link></li>
		<li><Link to="/users">Users</Link></li>
		<li><Link to="/#7s1a">Not found</Link></li>
	</ul>
</nav>
));

export default Nav;