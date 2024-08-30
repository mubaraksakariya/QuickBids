import { useMutation } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const createWithdrawalRequest = async (
	api,
	{ accountNumber, ifscCode, amount }
) => {
	const response = await api.post('/api/payments/create-withdrawal/', {
		account_number: accountNumber,
		ifsc_code: ifscCode,
		amount,
	});

	return response.data;
};

// Custom hook
const useCreateWithdrawalRequest = () => {
	const api = useApi();

	return useMutation({
		mutationFn: (data) => createWithdrawalRequest(api, data),
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
