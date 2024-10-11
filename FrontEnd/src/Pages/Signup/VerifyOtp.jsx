import React, { useEffect, useState } from 'react';
import TextInput from '../../Components/Form/TextInput';
import SignUpButton from './Components/SignUpButton';
import useApi from '../../Context/AxiosContext';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyOtp() {
	const [otp, setOtp] = useState();
	const [otpError, setOtpError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [info, setInfo] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const { email } = location.state || {};
	const api = useApi();
	useEffect(() => {
		if (!email) navigate('/signup/');
	}, [email]);

	const manageSubmit = async () => {
		setIsLoading(true);
		const currentTime = new Date().toLocaleString();
		try {
			const response = await api.post('api/users/verify_otp/', {
				email: email,
				otp: otp,
			});
			if ((response.statusText == 'OK') | (response.status == 200)) {
				navigate('/login/');
			}
		} catch (error) {
			if (error?.response?.data?.error) {
				const errorString = `${currentTime}: ${error.response.data.error}`;
				setOtpError(errorString);
			} else {
				console.error(error);
			}
		}
		setIsLoading(false);
	};
	const resendOtp = async () => {
		try {
			setIsDisabled(true); // Disable the button immediately
			const response = await api.post('api/users/resend_otp/', { email }); // Replace with your actual API endpoint
			setInfo(response.data.message);
			setTimeout(() => {
				setIsDisabled(false);
				setInfo('');
			}, 30000); // Enable the button after 1/2 minute (30000 milliseconds)
		} catch (error) {
			console.error('Error resending OTP:', error);
			setIsDisabled(false); // Enable the button in case of error
			// Handle error message or retry logic here
		}
	};
	return (
		<div className='md:flex items-center '>
			<div className='flex-1 flex justify-center items-center '>
				<div className=''>
					<img src='/QuickbidsAd.png' className='' alt='' />
				</div>
			</div>
			<div className='flex-1 flex justify-center items-center relative'>
				<div className='w-[50%]'>
					<div className='mb-4'>
						<h1>Verify OTP</h1>
						<TextInput
							// label='OTP'
							getValue={setOtp}
							placeholder='otp'
							errorMessage={otpError}
						/>
						<SignUpButton
							text='Confirm'
							onClick={manageSubmit}
							isBtnLoading={isLoading}
						/>
					</div>
					<div className=' absolute'>
						{isDisabled && <div>{info}</div>}
						{isDisabled ? (
							<span>
								please wait 30 seconds before trying again
							</span>
						) : (
							<span
								className=' cursor-pointer'
								onClick={resendOtp}>
								Resend otp
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default VerifyOtp;
