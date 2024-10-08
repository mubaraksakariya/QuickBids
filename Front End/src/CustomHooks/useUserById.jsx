import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { useSelector } from 'react-redux';

const fetchUserById = async (userId, api) => {
	const response = await api.get(`/api/users/${userId}`);
	return response.data;
};

// Custom hook
const useUserById = (userId) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const api = useApi();
	return useQuery({
		queryKey: ['bidUser', userId],
		queryFn: () => fetchUserById(userId, api),
		enabled: !!userId && isAuthenticated,
		staleTime: 60000, // Data is fresh for 1 minute
		cacheTime: 300000, // Cache for 5 minutes
		refetchOnWindowFocus: false, // Disable refetch on window focus
		retry: 1, // Retry failed requests once
	});
};

export default useUserById;
