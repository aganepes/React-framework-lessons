import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './page/ProtectedRoute';
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import User from './page/User';
import Counter from "./page/Counter";

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Routes>
			<Route path='/'
				element={<Home />}
			/>
			<Route path='/user'
				element={
					<ProtectedRoute>
						<User />
					</ProtectedRoute>
				}
			/>
			<Route path='/counter' element={<Counter />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='*' element={<h1 style={{color:"red"}}>Not Found...</h1>} />
		</Routes>
	</BrowserRouter>
)