import React, { useState } from 'react';
import GoogleSignup from '../Signup/Components/GoogleSignup';
import LoginForm from './Components/LoginForm';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from || '/';

	if (isAuthenticated) {
		return <Navigate to={from} replace={true} />;
	}

	return (
		<div className='md:flex items-center justify-center md:max-w-[85%] mx-auto py-12 px-4 sm:px-6 lg:px-8'>
			<div className='flex-1 flex justify-center items-center w-full'>
				<img
					src='/QuickbidsAd.png'
					alt=''
					className='max-w-full h-auto object-cover shadow-lg rounded-lg'
				/>
			</div>
			<div className='flex-1 flex justify-center items-center md:mt-0 mt-8 w-full'>
				<div className='shadow-lg rounded-lg p-6 sm:p-8 lg:p-10 bg-white w-full max-w-md'>
					<h1 className='text-center text-3xl sm:text-4xl font-bold mb-6 text-gray-800'>
						Sign In
					</h1>
					<GoogleSignup />
					<p className='text-center text-gray-600 my-6'>
						------ or sign in below ------
					</p>
					<LoginForm
						isLoading={isLoading}
						setIsLoading={setIsLoading}
					/>
					<div className='text-center mt-6'>
						<span className='text-gray-600'>
							Or{' '}
							<span
								className='cursor-pointer text-blue-600 underline hover:text-blue-800 transition-all duration-300'
								onClick={() => navigate('/signup/')}>
								sign up
							</span>{' '}
							here
						</span>
					</div>
					<div className='text-center mt-4'>
						<span
							className='cursor-pointer text-blue-600 hover:underline hover:text-blue-800 transition-all duration-300'
							onClick={() => navigate('/forgot-password/')}>
							Forgot password?
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
