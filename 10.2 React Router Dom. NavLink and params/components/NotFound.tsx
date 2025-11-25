import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
	const navigate = useNavigate();
	return <>
		<h2>Not found this page</h2>
		<button onClick={() => navigate("/")}>Go Home page</button>
	</>
}

export default NotFound