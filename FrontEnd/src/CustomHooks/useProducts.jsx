import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchProducts = async (
	api,
	searchString,
	selectedCategory,
	pageNumber,
	pageSize
) => {
	let params = {
		page: pageNumber,
		page_size: pageSize,
	};
	if (searchString) {
		params.search = searchString;
	}
	if (selectedCategory) {
		params.category = selectedCategory;
	}
	const response = await api.get(`api/products`, { params });
	return response.data;
};

const useProducts = (
	searchString,
	selectedCategory,
	pageNumber,
	pageSize = 2
) => {
	const api = useApi();

	return useQuery({
		queryKey: [
			'products',
			// searchString,
			// selectedCategory,
			// pageNumber,
			pageSize,
		],
		queryFn: () =>
			fetchProducts(
				api,
				searchString,
				selectedCategory,
				pageNumber,
				pageSize
			),
	});
};

export default useProducts;
