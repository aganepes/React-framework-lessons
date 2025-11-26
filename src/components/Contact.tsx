import React, { useEffect } from 'react'
import Nav from './Nav';

const Contact: React.FC = () => {
	const awaitRender=()=>{
		const time = setTimeout(()=>{console.log("Loading...")},2000);
		return time;
	}
	useEffect(()=>{
		awaitRender()
		return time;
	},[])
	return (<>
		<Nav />
		<h2>Contact Page</h2>
	</>
	)
}

export default Contact