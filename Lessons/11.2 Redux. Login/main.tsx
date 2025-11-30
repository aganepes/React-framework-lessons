import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './page/ProtectedRoute';
import Home from './page/Home';
import Login from './page/Login'
import Register from './page/Register'
import User from './page/User';


ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Home/>}
				/>
				<Route
					path='/user'
					element={
						<ProtectedRoute>
							<User />
						</ProtectedRoute>
					}
				/>
				<Route path='/login' element={<Login/>}/>
				<Route path='/register' element={<Register/>}/>
			</Routes>
		</BrowserRouter>
	</Provider>
)