import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { useError } from '../Context/ErrorContext';

const fetchCategoryExtras = async (api, categoryId) => {
	const response = await api.get(
		`/api/admin/categories/${categoryId}/category-extras/`
	);
	return response.data;
};

const useCategoryExtras = (categoryId) => {
	const api = useApi();
	const { showError } = useError();

	return useQuery({
		queryKey: ['categoryExtras', categoryId],
		queryFn: () => fetchCategoryExtras(api, categoryId),
		enabled: !!categoryId,
		onError: (error) => {
			console.error(error);
			showError(error.message);
		},
	});
};

export default useCategoryExtras;
