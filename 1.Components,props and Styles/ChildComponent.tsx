import React from 'react'

class ChildComponent extends React.Component<{ onRemove: () => void }> {
	constructor(props: { onRemove: () => void }) {
		super(props);
	}
	componentWillUnmount(): void {
		console.log("Child Element to unmount")
	}
	render() {
		return <>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, labore!</p>
			<button onClick={this.props.onRemove}>meni yokla!</button>
		</>
	};
}

export default ChildComponent