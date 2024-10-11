import { useQuery } from '@tanstack/react-query';
import useApi from '../../../../../../Context/AxiosContext';

const fetchAuctionCompletionType = async (api, fromDate, toDate) => {
	const params = {
		from_date: fromDate,
		to_date: toDate,
	};

	const response = await api.get('/api/report/auction-completion-type', {
		params,
	});
	return response.data;
};

const useAuctionCompletionType = (fromDate, toDate) => {
	const api = useApi();
	return useQuery({
		queryKey: ['auctionCompletionType', fromDate, toDate],
		queryFn: () => fetchAuctionCompletionType(api, fromDate, toDate),
	});
};
export default useAuctionCompletionType;
