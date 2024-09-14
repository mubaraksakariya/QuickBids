import { useMutation } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { convertExpiryDate } from '../Pages/Wallet/Components/Withdrawal/Debit/helpers';

const createWithdrawalRequestByCard = async (
	api,
	{ cardNumber, cvv, expiryDate, nameOnCard, amount }
) => {
	const response = await api.post('/api/withdrawal/create-withdrawal-card/', {
		card_number: cardNumber,
		cvv,
		valid_through: convertExpiryDate(expiryDate),
		name_on_card: nameOnCard,
		amount,
	});

	return response.data;
};

// Function to create a withdrawal request by account
const createWithdrawalRequestByAccount = async (
	api,
	{ accountNumber, ifscCode, amount }
) => {
	const response = await api.post(
		'/api/withdrawal/create-withdrawal-account/',
		{
			account_number: accountNumber,
			ifsc_code: ifscCode,
			amount: amount,
		}
	);

	return response.data;
};

// Function to create a withdrawal request by UPI
const createWithdrawalRequestByUpi = async (api, { upiId, amount }) => {
	const response = await api.post('/api/withdrawal/create-withdrawal-upi/', {
		upi_id: upiId,
		amount,
	});

	return response.data;
};

// Custom hook
const useCreateWithdrawalRequest = (type) => {
	const api = useApi();

	const createRequestFunctions = {
		card: createWithdrawalRequestByCard,
		account: createWithdrawalRequestByAccount,
		upi: createWithdrawalRequestByUpi,
	};

	return useMutation({
		mutationFn: (data) => {
			if (!createRequestFunctions[type]) {
				throw new Error(`Unknown withdrawal type: ${type}`);
			}
			return createRequestFunctions[type](api, data);
		},
		onError: (error) => {
			console.error('Error creating withdrawal request:', error);
			// Handle error (e.g., show a notification)
		},
		onSuccess: (data) => {
			console.log('Withdrawal request created successfully:', data);
			// Handle success (e.g., redirect, show a notification)
		},
		retry: 1, // Retry once on failure
	});
};

export default useCreateWithdrawalRequest;
