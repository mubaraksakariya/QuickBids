import { useQuery } from '@tanstack/react-query';
import useApi from '../../../../../Context/AxiosContext';

const getRequests = async (
	api,
	page,
	pageSize,
	fromDate,
	toDate,
	searchQuery,
	sorting,
	filter
) => {
	const response = await api.get('api/withdrawal/', {
		params: {
			page,
			page_size: pageSize,
			from_date: fromDate.toISOString(),
			to_date: toDate.toISOString(),
			search: searchQuery,
			ordering: `${sorting.order === 'asc' ? '' : '-'}${sorting.field}`,
			[filter.field]: filter.value,
		},
	});
	return response.data;
};

const useWithdrawalRequests = (
	page,
	pageSize,
	fromDate,
	toDate,
	searchQuery,
	sorting,
	filter = null
) => {
	const api = useApi();
	return useQuery({
		queryKey: [
			'withdrawal-requests',
			page,
			pageSize,
			fromDate,
			toDate,
			searchQuery,
			sorting,
			filter,
		],
		queryFn: () =>
			getRequests(
				api,
				page,
				pageSize,
				fromDate,
				toDate,
				searchQuery,
				sorting,
				filter
			),
	});
};

export default useWithdrawalRequests;
