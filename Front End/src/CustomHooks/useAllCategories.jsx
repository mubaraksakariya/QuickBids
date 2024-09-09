import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchAllCategories = async (
	api,
	query,
	fromDate,
	toDate,
	page,
	pageSize,
	sorting
) => {
	const params = {
		page,
		page_size: pageSize,
		search: query,
		from_date: fromDate,
		to_date: toDate,
		ordering: `${sorting.order === 'asc' ? '' : '-'}${sorting.field}`,
	};

	const response = await api.get('/api/categories/', { params });
	return response.data;
};

const useAllCategories = (
	query = '',
	fromDate,
	toDate,
	page = 1,
	pageSize = 10,
	sorting = { field: 'created_at', order: 'desc' }
) => {
	const api = useApi();

	return useQuery({
		queryKey: [
			'allCategories',
			query,
			fromDate,
			toDate,
			page,
			pageSize,
			sorting,
		],
		queryFn: () =>
			fetchAllCategories(
				api,
				query,
				fromDate,
				toDate,
				page,
				pageSize,
				sorting
			),
		staleTime: 60000,
		cacheTime: 300000,
		refetchOnWindowFocus: false,
		retry: 1,
	});
};

export default useAllCategories;