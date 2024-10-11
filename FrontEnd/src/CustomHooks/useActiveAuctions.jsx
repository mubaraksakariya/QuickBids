import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchActiveAuctions = async (api) => {
	const response = await api.get('/api/auctions/active-auctions/');
	return response.data;
};

const useActiveAuctions = () => {
	const api = useApi();

	return useQuery({
		queryKey: ['activeAuctions'],
		queryFn: () => fetchActiveAuctions(api),
	});
};

export default useActiveAuctions;
