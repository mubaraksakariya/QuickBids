import React, { useEffect } from 'react';
import ThemeButtons from '../../../Components/Buttons/ThemeButton';
import { loadScript } from './LoadScript';
import useApi from '../../../Context/AxiosContext';
import { useSelector } from 'react-redux';

function RazorpayButton({ amount, setError, setIsAddToWallet }) {
	const RAZOR_PAY_KEY_ID = import.meta.env.VITE_RAZOR_PAY_KEY_ID;
	const api = useApi();
	const user = useSelector((state) => state.auth.user);

	useEffect(() => {
		loadScript('https://checkout.razorpay.com/v1/checkout.js');
	}, []);

	const createRayzorpayOrder = async () => {
		const response = await api.post('/api/payments/create-order/', {
			amount: amount,
		});
		return response.data;
	};
	const onSuccess = async (responseData) => {
		console.log(responseData);
		const response = await api.post(
			'/api/wallet/payment-success/',
			responseData
		);
		if (response.data.status == 'success') {
			setIsAddToWallet(false);
			window.location.reload();
		}
		if (response.data.status == 'failed') {
			setIsAddToWallet(false);
			console.log(response.data.message);
		}
	};
	const manageAddBalance = async () => {
		if (amount <= 0) {
			setError('Enter an amount greater than 1');
			return 0;
		}
		try {
			const order = await createRayzorpayOrder(amount);
			// console.log(order);
			const options = {
				key: RAZOR_PAY_KEY_ID,
				amount: { amount },
				currency: 'INR',
				name: 'Quick Bids',
				description: 'Quick bids wallet topup',
				image: 'https://example.com/your_logo',
				order_id: order.id,
				handler: (response) => {
					onSuccess(response);
				},
				prefill: {
					name: user.first_name,
					email: user.email,
				},
				notes: {
					address: 'Razorpay Corporate Office',
				},
				theme: {
					color: '#3399cc',
				},
			};
			initiatePayment(options);
		} catch (error) {
			console.log(error);
		}
	};

	const initiatePayment = (options) => {
		const rzp1 = new window.Razorpay(options);
		rzp1.on('payment.failed', function (response) {
			alert(`Error: ${response.error.code}`);
			alert(response.error.description);
			alert(response.error.source);
			alert(response.error.step);
			alert(response.error.reason);
			alert(response.error.metadata.order_id);
			alert(response.error.metadata.payment_id);
		});

		rzp1.open();
	};
	return (
		<>
			<ThemeButtons
				text='Pay'
				type='submit'
				style={14}
				className={'px-5'}
				onclick={manageAddBalance}
			/>
		</>
	);
}

export default RazorpayButton;
