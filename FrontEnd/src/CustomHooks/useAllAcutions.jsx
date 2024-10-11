import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchAllAcutions = async (api, productId) => {
	const response = await api.get(`/api/auctions/all-auctions/`);
	// console.log(response.data);
	return response.data;
};

const useAllAcutions = (productId) => {
	const api = useApi();
	return useQuery({
		queryKey: ['auction'],
		queryFn: () => fetchAllAcutions(api),
	});
};

export default useAllAcutions;
