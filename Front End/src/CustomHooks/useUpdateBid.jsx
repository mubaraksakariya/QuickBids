import { useMutation } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const updateBid = async (api, { auctionId, amount }) => {
	const response = await api.post('/api/bids/', {
		auction_id: auctionId,
		amount,
	});
	return response.data;
};

const useUpdateBid = () => {
	const api = useApi();

	return useMutation({
		mutationFn: (bidData) => updateBid(api, bidData),
	});
};

export default useUpdateBid;
