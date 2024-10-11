import { useMutation } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { useError } from '../Context/ErrorContext';

const updateBid = async (api, { auctionId, amount }) => {
	const response = await api.post('/api/bids/', {
		auction_id: auctionId,
		amount,
	});
	return response.data;
};

const useUpdateBid = () => {
	const api = useApi();
	const { showError } = useError();
	return useMutation({
		mutationFn: (bidData) => updateBid(api, bidData),
		onError: (error) => {
			console.log(error);

			showError(error.message);
		},
	});
};

export default useUpdateBid;
