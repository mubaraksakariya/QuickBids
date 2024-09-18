import { useMutation } from '@tanstack/react-query';
import useApi from '../../../../../Context/AxiosContext';

const updateWithdrawalRequestApi = async (formData, requestId, api) => {
	const response = await api.patch(
		`/api/withdrawal/${requestId}/`,
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	);
	return response.data;
};

const useUpdateWithdrawalRequest = () => {
	const api = useApi();

	return useMutation({
		mutationFn: ({ formData, requestId }) =>
			updateWithdrawalRequestApi(formData, requestId, api),
		onSuccess: (data) => {
			console.log('Withdrawal request updated successfully:', data);
		},
		onError: (error) => {
			// Handle error
			console.error('Error updating withdrawal request:', error);
		},
	});
};

export default useUpdateWithdrawalRequest;
