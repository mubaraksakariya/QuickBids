import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchProductById = async (productId, api) => {
	const response = await api.get(`/api/products/${productId}/`);
	return response.data;
};

// Custom hook
const useProductById = (productId) => {
	const api = useApi();

	return useQuery({
		queryKey: ['product', productId],
		queryFn: () => fetchProductById(productId, api),
		enabled: !!productId, // Query is enabled only when productId is provided
		staleTime: 60000, // Data is fresh for 1 minute
		cacheTime: 300000, // Cache for 5 minutes
		refetchOnWindowFocus: false, // Disable refetch on window focus
		retry: 1, // Retry failed requests once
	});
};

export default useProductById;
