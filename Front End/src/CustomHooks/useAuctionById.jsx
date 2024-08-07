import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchAuctionById = async (api, auctionId) => {
	const response = await api.get(
		`/api/auctions/${auctionId}/with-product-details/`
	);
	return response.data;
};

const useAuctionById = (auctionId) => {
	const api = useApi();
	return useQuery({
		queryKey: ['auctionById', auctionId],
		queryFn: () => fetchAuctionById(api, auctionId),
		enabled: !!auctionId,
	});
};

export default useAuctionById;
