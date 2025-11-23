import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx'
import { CounterProvider } from './context/Counter.tsx';

createRoot(document.getElementById('root')!).render(
	<CounterProvider>
		<App />
	</CounterProvider>
);
