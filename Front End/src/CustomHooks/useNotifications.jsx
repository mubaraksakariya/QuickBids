import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchNotifications = async (api, page, pageSize) => {
	const params = {
		page,
		page_size: pageSize,
	};

	const response = await api.get('/api/notifications', { params });
	return response.data;
};

const useNotifications = (page = 1, pageSize = 10) => {
	const api = useApi();

	return useQuery({
		queryKey: ['notifications', page, pageSize],
		queryFn: () => fetchNotifications(api, page, pageSize),
		staleTime: 60000,
		onError: (error) => {
			console.log('Error fetching notifications:');
		},
	});
};

export default useNotifications;
