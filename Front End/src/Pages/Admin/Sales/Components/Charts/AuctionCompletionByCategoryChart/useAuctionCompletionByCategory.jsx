import { useQuery } from '@tanstack/react-query';
import useApi from '../../../../../../Context/AxiosContext';

const fetchAuctionCompletionByCategory = async (api, fromDate, toDate) => {
	const params = {
		from_date: fromDate,
		to_date: toDate,
	};
	const response = await api.get(
		'/api/report/auction-completion-by-category',
		{
			params,
		}
	);
	return response.data;
};

const useAuctionCompletionByCategory = (fromDate, toDate) => {
	const api = useApi();
	return useQuery({
		queryKey: ['auctionCompletionByCategory', fromDate, toDate],
		queryFn: () => fetchAuctionCompletionByCategory(api, fromDate, toDate),
	});
};

export default useAuctionCompletionByCategory;
