import { useQuery } from '@tanstack/react-query';
import useApi from '../../../../../Context/AxiosContext';

const getRequests = async (
	api,
	page,
	pageSize,
	fromDate,
	toDate,
	searchQuery,
	sorting
) => {
	const response = await api.get('api/withdrawal/', {
		params: {
			page,
			page_size: pageSize,
			from_date: fromDate.toISOString(),
			to_date: toDate.toISOString(),
			search: searchQuery,
			ordering: `${sorting.order === 'asc' ? '' : '-'}${sorting.field}`,
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
	sorting
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
		],
		queryFn: () =>
			getRequests(
				api,
				page,
				pageSize,
				fromDate,
				toDate,
				searchQuery,
				sorting
			),
	});
};

export default useWithdrawalRequests;
