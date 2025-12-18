import { FC, useState } from "react";

const App: FC = () => {
	const [pageName, setPageName] = useState<string>('');
	return (
		<>
		<h1>App Components</h1>
		</>
	)
}

export default App;