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
		<div className='md:flex items-center'>
			<div className='flex-1 flex justify-center items-center '>
				<div className=''>
					<img src='/QuickbidsAd.png' className='' alt='' />
				</div>
			</div>
			<div className='flex-1 flex justify-center items-center'>
				<div className='w-[50%]'>
					<div className='mb-4'>
						<h1 className=' text-center text-5xl font-semibold '>
							Sign in
						</h1>
						{/* <p className=' text-center'>Do business with us</p> */}
					</div>
					<div className='pb-4'>
						<GoogleSignup />
					</div>
					<div className=''>
						<p className=' opacity-55 text-center'>
							------ or sign in below -------
						</p>
					</div>
					<div className=''>
						<LoginForm
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
						<div>
							Or{' '}
							<span
								className=' cursor-pointer underline'
								onClick={() => navigate('/signup/')}>
								Signup
							</span>{' '}
							here
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
