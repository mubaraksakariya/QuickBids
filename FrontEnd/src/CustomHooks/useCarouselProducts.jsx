import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchCarouselProducts = async (api) => {
	const response = await api.get('/api/products/carousel-products/');
	return response.data;
};

export const useCarouselProducts = () => {
	const api = useApi();
	return useQuery({
		queryKey: ['carouselProducts'],
		queryFn: () => fetchCarouselProducts(api),
		staleTime: 5 * 60 * 1000, // 5 minutes
		cacheTime: 10 * 60 * 1000, // 10 minutes
	});
};
