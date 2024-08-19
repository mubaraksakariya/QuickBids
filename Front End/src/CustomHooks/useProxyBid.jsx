import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchProxyBid = async (api, auctionId, userId) => {
	let url = `/api/proxy-bids/current-proxy-bid/?auction_id=${auctionId}`;
	if (userId) {
		url += `&user_id=${userId}`;
	}
	try {
		const response = await api.get(url);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

// for both an auctions proxy bid and if user is passed that users proxy bid
const useProxyBid = (auctionId, userId = null) => {
	const api = useApi();

	return useQuery({
		queryKey: ['proxyBid', auctionId, userId],
		queryFn: () => fetchProxyBid(api, auctionId, userId),
		enabled: !!auctionId,
		// retry: false,
	});
};

export default useProxyBid;
