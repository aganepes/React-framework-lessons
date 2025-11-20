import React, { useState } from 'react';
import './App.css';
import styles from "./App.module.css";
import ChildComponent from './ChildComponent';


type propType = { name: string };
type stateType = propType;
// function App({name}:propType) {
// 	const [userName,setUserName] = useState<string>(""); 
// 	return (
// 		<>
// 			<h1 onClick={() => setUserName("REACT")}
// 				//! styles
// 				// className='h1'
// 				// className={styles.h1}
// 				style={{color:"green"}}
// 				>
// 				{name}<br/>
// 				{userName}
// 			</h1>
// 		</>
// 	)
// }


// const App = ({name}:propType): ReactElement => {
// 	return <>
// 		<h1>Hello React: {name}</h1>
// 		<h1>Hello React: {name}</h1>
// 	</>
// }


// ! class Component
class App extends React.Component<propType,stateType & {childVisible:boolean}> {
	constructor(props:propType) {
		super(props);
		this.state = { name: "",childVisible:true }
	}
	removeChild = ():void=>{
		this.setState({childVisible:!this.state.childVisible});
	}
	componentDidMount(): void {
		console.log('mount');
	}
	componentDidUpdate(prevProps:propType,prevStates:stateType): void {
		if(this.state.name != prevStates.name){
			console.log('update state');
		}
		console.log('update');
	}
	componentWillUnmount(): void {
		console.log("unmount");
	}
	render() {
		return <>
		<h1 onClick={() => this.setState({ name: "REACT" })}
			//! styles
			// className='h1'
			// className={styles.h1}
			style={{color:"green"}}
			>
			{this.props.name}<br/>
			{this.state.name}
		</h1>
		{this.state.childVisible && <ChildComponent  onRemove={this.removeChild}/>}
	</>
	}
}

export default App;
