import React from 'react'
import { UserData } from './User';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from '../styles/App.module.css';
import Nav from './Nav';

const Users: React.FC = () => {
	const navigate = useNavigate();
	return <div className={styles.userCont}>
		<Nav />
		<div className={styles.userList}>
			{userData.map((user) => {
				return <p key={user.id} onClick={() => navigate(`/users/${user.id}`)}>{user.name}</p>
			})}
		</div>
		<Outlet />
	</div>
}

// eslint-disable-next-line react-refresh/only-export-components
export const userData: UserData[] = [
	{
		id: 1,
		name: "Myrat",
		address: "Myraly köçe, jaý 23."
	},
	{
		id: 2,
		name: "Gurbanmyrat",
		address: "Mollanepes köçe, jaý 25."
	},
	{
		id: 3,
		name: "Jemşit",
		address: "Magtymguly köçe, jaý 30."
	}
]

export default Users