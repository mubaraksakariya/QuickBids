import { useQuery } from '@tanstack/react-query';
import useApi from '../../../../../../Context/AxiosContext';

const fetchAuctionCompletionByCategory = async (api) => {
	const response = await api.get(
		'/api/report/auction-completion-by-category'
	);
	return response.data;
};

const useAuctionCompletionByCategory = () => {
	const api = useApi();
	return useQuery({
		queryKey: ['auctionCompletionByCategory'],
		queryFn: () => fetchAuctionCompletionByCategory(api),
	});
};
export default useAuctionCompletionByCategory;
