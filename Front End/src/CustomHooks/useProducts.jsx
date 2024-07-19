import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchProducts = async (api, searchString, selectedCategory) => {
	const params = {};
	if (searchString) {
		params.search = searchString;
	}
	if (selectedCategory) {
		params.category = selectedCategory;
	}
	const response = await api.get('api/products/', { params });
	// console.log(response.data);
	return response.data;
};

const useProducts = (searchString, selectedCategory) => {
	const api = useApi();

	return useQuery({
		queryKey: ['products', searchString, selectedCategory],
		queryFn: () => fetchProducts(api, searchString, selectedCategory),
	});
};

export default useProducts;
