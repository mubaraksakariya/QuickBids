import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchProfileProducts = async (api) => {
	const response = await api.get('/api/products/profile-products/');
	return response.data;
};

const useProfileProducts = () => {
	const api = useApi();

	return useQuery({
		queryKey: ['userProducts'],
		queryFn: () => fetchProfileProducts(api),
	});
};

export default useProfileProducts;
