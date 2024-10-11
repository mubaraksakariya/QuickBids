import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useError } from '../Context/ErrorContext'; // Assuming you have a custom error handling context

const verifyBankAccountDetails = async ({
	bankAccount,
	ifscCode,
	name,
	phone,
}) => {
	const response = await axios.post(
		'https://sandbox.cashfree.com/verification/bank-account/async',
		{
			bank_account: bankAccount,
			ifsc: ifscCode,
			name: name,
			phone: phone,
		},
		{
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				'Access-Control-Allow-Origin': '*', // Allow all origins
				'Access-Control-Allow-Methods':
					'POST, GET, OPTIONS, PUT, DELETE', // Allow specific methods
				'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allow specific headers
			},
		}
	);

	return response.data;
};

const useVerifyBankAccount = ({ bankAccount, ifscCode, name, phone }) => {
	const { showError } = useError(); // Assuming you have a custom error handling context

	return useQuery({
		queryKey: ['verifyBankAccount', bankAccount, ifscCode, name, phone],
		queryFn: () =>
			verifyBankAccountDetails({ bankAccount, ifscCode, name, phone }),
		enabled: !!bankAccount && !!ifscCode && !!name && !!phone, // Ensure all required fields are provided
		onError: (error) => {
			showError('Error verifying bank account details:', error);
		},
		// Optionally, add other configurations like refetchOnWindowFocus, retry, etc.
	});
};

export default useVerifyBankAccount;
