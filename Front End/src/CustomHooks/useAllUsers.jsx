import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { useSelector } from 'react-redux';

const fetchAllUsers = async (api, query) => {
	let response = null;
	if (!query) {
		response = await api.get('/api/users/');
	} else if (query === 'recent') {
		response = await api.get('/api/users/?recent=true');
	}
	return response.data;
};

// Custom hook for fetching all users
const useAllUsers = (query) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isAdmin = useSelector((state) => state.auth.isAdmin);
	const api = useApi();

	return useQuery({
		queryKey: ['allUsers', query],
		queryFn: () => fetchAllUsers(api, query),
		enabled: isAuthenticated && isAdmin,
		staleTime: 60000,
		cacheTime: 300000,
		refetchOnWindowFocus: false,
		retry: 1,
	});
};

export default useAllUsers;
