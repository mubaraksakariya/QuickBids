import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchRecentCustomers = async (api) => {
	const response = await api.get('/api/users/recent-customers/');
	return response.data;
};

const useRecentCustomers = () => {
	const api = useApi();

	return useQuery({
		queryKey: ['recentCustomers'],
		queryFn: () => fetchRecentCustomers(api),
		staleTime: 60000, // Cache for 1 minute
		cacheTime: 300000, // Cache time 5 minutes
		refetchOnWindowFocus: false, // Avoid refetching on window focus
	});
};

export default useRecentCustomers;
