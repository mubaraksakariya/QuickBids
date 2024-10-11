import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import useApi from '../../Context/AxiosContext';
import ThemeButtons from '../Buttons/ThemeButton';

const RequestPasswordReset = () => {
	const [email, setEmail] = useState('');
	const api = useApi();
	const mutation = useMutation({
		mutationFn: async () => {
			await api.post('/api/users/password-reset-request/', { email });
		},
		onSuccess: () => {
			alert('Password reset email sent');
		},
		onError: (error) => {
			console.error('Error requesting password reset:', error);
			alert('Error requesting password reset');
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		mutation.mutate();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className=''>
				<div className='pb-2'>
					<label className='block pb-2'>Email:</label>
					<input
						type='email'
						value={email}
						className=' rounded-xl'
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className=''>
					<ThemeButtons
						text='Reset'
						className={'p-2'}
						type='submit'
					/>
				</div>
			</div>
		</form>
	);
};

export default RequestPasswordReset;
