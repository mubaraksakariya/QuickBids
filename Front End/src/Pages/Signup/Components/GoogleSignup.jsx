import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
function GoogleSignup() {
	const onSuccess = (credentialResponse) => {
		console.log(credentialResponse);
	};
	return (
		<div className=' flex justify-center'>
			<GoogleLogin
				onSuccess={onSuccess}
				onError={() => {
					console.log('Login Failed');
				}}
				text='signup_with'
				width={'300'}
				// theme='filled_black'
				logo_alignment='center'
				// type='icon'
			/>
		</div>
	);
}

export default GoogleSignup;
