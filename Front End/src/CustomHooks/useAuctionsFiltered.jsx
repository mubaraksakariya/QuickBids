import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchAuctions = async (
	api,
	page,
	pageSize,
	fromDate,
	toDate,
	search,
	sorting
) => {
	const params = {
		page,
		page_size: pageSize,
		from_date: fromDate,
		to_date: toDate,
		search,
		sorting: `${sorting.order == 'asc' ? '-' : ''}${sorting.field}`,
	};

	const response = await api.get('/api/auctions/filter-auctions', { params });
	return response.data;
};

const useAuctionsFiltered = (
	page = 1,
	pageSize = 10,
	fromDate = '',
	toDate = '',
	search = '',
	sorting
) => {
	const api = useApi();

	return useQuery({
		queryKey: ['auctions', page, fromDate, toDate, search, sorting],
		queryFn: () =>
			fetchAuctions(
				api,
				page,
				pageSize,
				fromDate,
				toDate,
				search,
				sorting
			),
		keepPreviousData: true,
		onSuccess: (data) => {
			console.log(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

export default useAuctionsFiltered;
