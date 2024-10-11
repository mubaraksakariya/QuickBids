import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchHighestBid = async (api, auctionId) => {
	const response = await api.get(`/api/bids/${auctionId}/highest-bid`);
	return response.data;
};

const useHighestBid = (auctionId) => {
	const api = useApi();

	return useQuery({
		queryKey: ['highestBid', auctionId],
		queryFn: () => fetchHighestBid(api, auctionId),
		enabled: !!auctionId,
	});
};

export default useHighestBid;
