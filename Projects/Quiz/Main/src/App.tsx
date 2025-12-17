import { FC, useState } from "react";
import FirstPage from "./components/FirstPage";
import SecondPage from "./components/Question";

const App: FC = () => {
	const [pageName, setPageName] = useState<string>('');
	return (
		<div className="w-full min-h-[100vh] p-2 flex justify-center items-center select-none ">
			{pageName
				? <SecondPage pageName={pageName} setPageName={setPageName}/>
				: <FirstPage setPageName={setPageName} />
			}
		</div>
	)
}

export default App;