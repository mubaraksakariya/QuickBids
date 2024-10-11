import { useMutation } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { useError } from '../Context/ErrorContext';

const placeProxyBid = async (api, { auctionId, maxBid, bidStep }) => {
	const response = await api.post('/api/proxy-bids/place-proxy-bid/', {
		auction: auctionId,
		max_bid: maxBid,
		bid_step: bidStep,
	});
	return response.data;
};

const usePlaceProxyBid = () => {
	const api = useApi();
	const { showError } = useError();

	return useMutation({
		mutationFn: (proxyBidData) => placeProxyBid(api, proxyBidData),
		onSuccess: (data) => {
			console.log('Proxy bid placed successfully:', data);
		},
		onError: (error) => {
			console.error('Error placing proxy bid:', error);
			showError(
				error.message || 'An error occurred while placing the proxy bid'
			);
		},
	});
};

export default usePlaceProxyBid;
