import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { useSelector } from 'react-redux';

// Function to fetch users with pagination
const fetchUsers = async (page, pageSize, api) => {
	const response = await api.get('/api/users/all_users/', {
		params: {
			page: page,
			page_size: pageSize,
		},
	});
	return response.data;
};

// Custom hook for paginated users
const usePaginatedUsers = (page = 1, pageSize = 10) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const api = useApi();

	return useQuery({
		queryKey: ['paginatedUsers', page, pageSize],
		queryFn: () => fetchUsers(page, pageSize, api),
		enabled: isAuthenticated,
		staleTime: 60000, // Data is fresh for 1 minute
		cacheTime: 300000, // Cache for 5 minutes
		refetchOnWindowFocus: false,
		retry: 1,
	});
};

export default usePaginatedUsers;
