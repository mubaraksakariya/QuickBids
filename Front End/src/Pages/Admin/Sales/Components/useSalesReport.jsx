import { useQuery } from '@tanstack/react-query';
import useApi from '../../../../Context/AxiosContext';

const fetchSalesReport = async (
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
	const response = await api.get('/api/report/sales', { params });
	return response.data;
};

const useSalesReport = (
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
			'salesReport',
			query,
			fromDate,
			toDate,
			page,
			pageSize,
			sorting,
		],
		queryFn: () =>
			fetchSalesReport(
				api,
				query,
				fromDate,
				toDate,
				page,
				pageSize,
				sorting
			),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

export default useSalesReport;
