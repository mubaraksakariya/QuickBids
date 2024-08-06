import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchNotifications = async (api) => {
	try {
		const response = await api.get('/api/notifications');
	} catch (error) {
		console.log(error);
	}
	return response.data;
};

const useNotifications = () => {
	const api = useApi();

	return useQuery({
		queryKey: ['notifications'],
		queryFn: () => fetchNotifications(api),
		staleTime: 60000,
		onError: (error) => {
			console.log('Error fetching notifications:');
		},
	});
};

export default useNotifications;
