import React from 'react';
import { Link } from 'react-router-dom';

// TypeScript interface for component props
interface HomeProps {
	userName?: string; // Optional user name prop
}

// Styles defined as a JavaScript/TypeScript object
const styles = {
	container: {
		padding: '40px',
		backgroundColor: '#f4f7f6', // Light gray/blue background
		minHeight: '100vh',
		textAlign: 'center' as const, // For CSS text-align property
		fontFamily: 'Arial, sans-serif',
	},
	header: {
		color: '#2c3e50', // Dark blue/gray header color
		fontSize: '3em',
		marginBottom: '20px',
	},
	greeting: {
		color: '#34495e', // Slightly less dark greeting color
		fontSize: '1.5em',
		marginBottom: '30px',
	},
	content: {
		maxWidth: '800px',
		margin: '0 auto',
		padding: '20px',
		backgroundColor: '#ffffff', // White content box
		borderRadius: '10px',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle box shadow
	},
	listItem: {
		listStyle: 'none',
		padding: '10px 0',
		borderBottom: '1px solid #ecf0f1',
		cursor: 'pointer',
		transition: 'background-color 0.3s',
	},
	list: {
		padding: '0',
		marginTop: '20px',
	}
};

const Home: React.FC<HomeProps> = ({ userName = 'Guest' }) => {
	return (
		<div style={styles.container}>
			{/* Main Header */}
			<h1 style={styles.header}>Welcome to the Application!</h1>

			<ul style={styles.list}>
				<li style={styles.listItem}><Link to='/register'>={">"}Register</Link></li>
				<li style={styles.listItem}><Link to='/login'>={">"}Login</Link></li>
				<li style={styles.listItem}><Link to='/user'>={">"}User</Link></li>
			</ul>
			{/* Personalized Greeting */}
			<p style={styles.greeting}>
				Hello, **{userName}**. Here is your current information:
			</p>

			{/* Content Box */}
			<div style={styles.content}>
				<h2>Latest Updates</h2>

				{/* Example List */}
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