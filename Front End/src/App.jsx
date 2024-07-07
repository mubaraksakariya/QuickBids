import { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Signup/SignUp';
import DashBoard from './Pages/Admin/Home/DashBoard';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				path: '',
				element: <Home />,
				// loader: teamLoader,
			},
			{
				path: 'login',
				element: <Login />,
				// loader: teamLoader,
			},
			{
				path: 'signup',
				element: <SignUp />,
				// loader: teamLoader,
			},

			//For admin side

			{
				path: 'admin',
				children: [
					{
						path: '',
						element: <DashBoard />,
						// loader: teamLoader,
					},
				],
			},
		],
	},
]);

const GOOGLE_CLIENT_ID = import.meta.env.VITE_0AUTH_CLIENT_ID;
function App() {
	return (
		<>
			<div className=' flex flex-col justify-center items-center min-h-[100dvh] bg-themeBgColour'>
				<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
					<RouterProvider router={router} />
				</GoogleOAuthProvider>
				;
			</div>
		</>
	);
}

export default App;
