import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchHighestBidByUser = async (auctionId, userId, api) => {
	if (!auctionId || !userId) {
		throw new Error('Auction ID and User ID are required');
	}

	const response = await api.get(`/api/bids/highest-bid-by-user/`, {
		params: {
			auction_id: auctionId,
			user_id: userId,
		},
	});

	return response.data;
};

const useHighestBidByUser = (auctionId, userId) => {
	const api = useApi();

	return useQuery({
		queryKey: ['highestBidByUser', auctionId, userId],
		queryFn: () => fetchHighestBidByUser(auctionId, userId, api),
		enabled: !!auctionId && !!userId, // Only fetch if auctionId and userId are provided
		staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
		cacheTime: 10 * 60 * 1000, // Cache for 10 minutes
		refetchOnWindowFocus: false, // Disable refetch on window focus
		retry: 1, // Retry failed requests once
	});
};

export default useHighestBidByUser;
