import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import styles from '../styles/App.module.css';
import { userData } from "./Users";


export type UserData = {
	id: number;
	name: string;
	address: string;
}

const User: React.FC = () => {
	const [user, setUser] = useState<UserData | null>(null);

	const { id } = useParams();
	const [search] = useSearchParams();
	useEffect(() => {
		const user = userData.find((u) => u.id == Number(id));
		if (user) setUser(user);
	}, [id]);
	return <>
		{user &&
			(<div className={styles.card}>
				<h3>Name: {user?.name}</h3>
				<address>Address: {user?.address}</address>
				{search.get("q") && <h6>Query: {search.get("q")}</h6>}
			</div>)}
	</>
}

export default User;