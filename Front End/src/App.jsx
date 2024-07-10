import { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Signup/SignUp';
import DashBoard from './Pages/Admin/Home/DashBoard';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useSelector } from 'react-redux';
import { useAuth } from './Context/AuthContext';
import VerifyOtp from './Pages/Signup/VerifyOtp';

function App() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const GOOGLE_CLIENT_ID = import.meta.env.VITE_0AUTH_CLIENT_ID;
	const { isLoading } = useAuth();

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
					element: isAuthenticated ? (
						<Navigate to='/' replace={true} />
					) : (
						<Login />
					),
					// loader: teamLoader,
				},
				{
					path: 'signup',
					element: isAuthenticated ? (
						<Navigate to='/' replace={true} />
					) : (
						<SignUp />
					),
					// loader: teamLoader,
				},
				{
					path: 'verify',
					element: <VerifyOtp />,
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
	return (
		<>
			<div className='flex flex-col justify-center items-center min-h-[100dvh] bg-themeBgColour'>
				<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
					{isLoading ? (
						<div className=' text-black text-5xl sm:text-6xl md:text-8xl lg:text-9xl'>
							Loading
						</div>
					) : (
						<RouterProvider router={router} />
					)}
				</GoogleOAuthProvider>
			</div>
		</>
	);
}

export default App;
