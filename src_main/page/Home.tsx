import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/link.css';
import { useAuthStore } from '../features/auth/store';

const styles = {
	container: {
		padding: '40px',
		backgroundColor: '#f4f7f6',
		minHeight: '100vh',
		textAlign: 'center' as const,
		fontFamily: 'Arial, sans-serif',
	},
	header: {
		color: '#2c3e50',
		fontSize: '3em',
		marginBottom: '20px',
	},
	greeting: {
		color: '#34495e',
		fontSize: '1.5em',
		marginBottom: '30px',
	},
	content: {
		maxWidth: '800px',
		margin: '0 auto',
		padding: '20px',
		backgroundColor: '#ffffff',
		borderRadius: '10px',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
	},
	listItem: {
		listStyle: 'none',
		padding: '10px 0',
		borderBottom: '1px solid #ecf0f1',
		cursor: 'pointer',
		transition: 'background-color 0.3s easy-in-out',
	},
	list: {
		display: "flex",
		gap: '1rem',
		padding: '0',
		marginTop: '20px',
	},
};

interface HomeProps {
	userName?: string;
}

const Home: React.FC<HomeProps> = ({ userName = 'Not name' }) => {
	const loadUserFromStorage = useAuthStore((state)=>state.loadUserFromStorage);
	const user = useAuthStore((state)=>state.user);
	const logout = useAuthStore((state)=>state.logout);

	useEffect(() => {
		loadUserFromStorage();
	}, []);
	
	return (
		<div style={styles.container}>
			<h1 style={styles.header}>Welcome to the Application!</h1>
			<ul style={styles.list}>
				{user ? (
					<>
						<li style={styles.listItem}>
							<div className={"link"} onClick={() => logout()}>Logout</div>
						</li>
						<li style={styles.listItem}>
							<NavLink to='/user'
								className={({ isActive }) => isActive ? "active-link" : "link"}
							>User</NavLink>
						</li>

					</>
				) : (
					<>
						<li style={styles.listItem}>
							<NavLink to='/login'
								className={({ isActive }) => isActive ? "active-link" : "link"}
							>Login</NavLink>
						</li>
						<li style={styles.listItem}>
							<NavLink to='/register'
								className={({ isActive }) => isActive ? "active-link" : "link"}
							>Register</NavLink>
						</li>
					</>
				)}
			</ul>

			<p style={styles.greeting}>
				Hello, **{user ? user.name : userName}**. Here is your current information:
			</p>

			<div style={styles.content}>
				<h2>Latest Updates</h2>
				<ul style={styles.list}>
					<li style={styles.listItem}>🚀 New Features are Live</li>
					<li style={styles.listItem}>📚 Documentation Updates</li>
					<li style={styles.listItem}>💡 Tips and Tricks</li>
				</ul>

				<p style={{ marginTop: '30px', color: '#7f8c8d' }}>
					You can start customizing your page here.
				</p>
			</div>
		</div>
	);
};

export default Home;

