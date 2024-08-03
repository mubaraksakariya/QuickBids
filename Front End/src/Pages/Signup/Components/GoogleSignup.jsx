import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import useApi from '../../../Context/AxiosContext';
import { useDispatch } from 'react-redux';
import { login } from '../../../Store/authSlice';
import { useNavigate } from 'react-router-dom';
function GoogleSignup() {
	const api = useApi();
	const dispactch = useDispatch();
	const navigate = useNavigate();
	const onSuccess = async (credentialResponse) => {
		// console.log(credentialResponse);
		try {
			const response = await api.post('api/users/google_login/', {
				credentialResponse: credentialResponse,
			});
			// console.log(response);
			const accessToken = response.data.access;
			const refreshToken = response.data.refresh;
			const user = response.data.user;
			dispactch(login({ accessToken, refreshToken, user }));
			navigate('/');
		} catch (error) {
			console.log(error.response.data);
		}
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