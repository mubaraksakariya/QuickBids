import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchAuctions = async (api, productId) => {
	const response = await api.get(`/api/auctions/by-product/${productId}`);
	return response.data;
};

const useAuction = (productId) => {
	const api = useApi();
	return useQuery({
		queryKey: ['auction', productId],
		queryFn: () => fetchAuctions(api, productId),
		enabled: !!productId,
	});
};

export default useAuction;
