import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchHighestBid = async (api, productId) => {
	const response = await api.get(`/api/bids/${productId}/highest-bid`);
	// console.log(response);
	return response.data;
};

const useHighestBid = (productId) => {
	const api = useApi();

	return useQuery({
		queryKey: ['highestBid', productId],
		queryFn: () => fetchHighestBid(api, productId),
		enabled: !!productId,
	});
};

export default useHighestBid;
