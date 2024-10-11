import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext'; // Adjust the path as needed

const fetchTotalAuctions = async (api) => {
	const response = await api.get('/api/auctions/total_auctions/');
	return response.data; // Adjust if needed based on the response structure
};

const useTotalAuctions = () => {
	const api = useApi();

	return useQuery({
		queryKey: ['totalAuctions'],
		queryFn: () => fetchTotalAuctions(api),
	});
};

export default useTotalAuctions;
