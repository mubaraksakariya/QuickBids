import React, { useState } from 'react';
import SignUpForm from './Components/SignUpForm';
import GoogleSignup from './Components/GoogleSignup';

function SignUp() {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<div className='md:flex items-center'>
			<div className='flex-1 flex justify-center items-center '>
				<div className=''>
					<img src='/QuickbidsAd.png' className='' alt='' />
				</div>
			</div>
			<div className='flex-1 flex justify-center items-center'>
				<div className='w-[50%]'>
					<div className='mb-5'>
						<h1 className=' text-center text-5xl font-semibold py-2'>
							Sign up
						</h1>
						<p className=' text-center'>Do business with us</p>
					</div>
					<div className='pb-4'>
						<GoogleSignup />
					</div>
					<div className='flex justify-center'>
						<p className=' opacity-55 pb-4'>
							------ or sign up below -------
						</p>
					</div>
					<div className=''>
						<SignUpForm
							isLoading={isLoading}
							setIsLoading={setIsLoading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
