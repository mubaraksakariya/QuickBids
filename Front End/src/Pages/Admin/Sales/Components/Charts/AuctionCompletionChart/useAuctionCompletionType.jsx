import { useQuery } from '@tanstack/react-query';
import useApi from '../../../../../../Context/AxiosContext';

const fetchAuctionCompletionType = async (api) => {
	const response = await api.get('/api/report/auction-completion-type');
	return response.data;
};

const useAuctionCompletionType = () => {
	const api = useApi();
	return useQuery({
		queryKey: ['auctionCompletionType'],
		queryFn: () => fetchAuctionCompletionType(api),
	});
};
export default useAuctionCompletionType;
