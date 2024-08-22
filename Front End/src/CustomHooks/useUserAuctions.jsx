import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const getAuction = async (api, auctionQuery) => {
	let endpoint;

	switch (auctionQuery) {
		case 'active':
			endpoint = '/api/auctions/user-active-auctions/';
			break;
		case 'completed':
			endpoint = '/api/auctions/user-completed-auctions/';
			break;
		case 'failed':
			endpoint = '/api/auctions/user-failed-auctions/';
			break;
		default:
			throw new Error('Invalid auction query type');
	}

	const response = await api.get(endpoint);
	console.log(response.data);

	return response.data;
};

// Custom hook
const useUserAuctions = (auctionQuery) => {
	const api = useApi();

	return useQuery({
		queryKey: [auctionQuery],
		queryFn: () => getAuction(api, auctionQuery),
		staleTime: 60000, // Data is fresh for 1 minute
		cacheTime: 300000, // Cache for 5 minutes
		refetchOnWindowFocus: false, // Disable refetch on window focus
		retry: 1,
	});
};

export default useUserAuctions;
