import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import useApi from '../Context/AxiosContext';

const getExtraUserDetails = async (api, userId) => {
	const response = await api.get(`api/users/${userId}/user_extras`);
	return response.data;
};

const useUserExtraDetails = (userId) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isAdmin = useSelector((state) => state.auth.isAdmin);
	const api = useApi();
	return useQuery({
		queryKey: ['userExtras', userId],
		queryFn: () => getExtraUserDetails(api, userId),
		enabled: !!userId && isAuthenticated && isAdmin,
		staleTime: 60000, // Data is fresh for 1 minute
		cacheTime: 300000, // Cache for 5 minutes
		refetchOnWindowFocus: false, // Disable refetch on window focus
		retry: 1, // Retry failed requests once
	});
};

export default useUserExtraDetails;
