import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { useSelector } from 'react-redux';

const fetchUsers = async (
	api,
	page,
	startDate,
	endDate,
	searchQuery,
	sorting
) => {
	const response = await api.get('/api/users/', {
		params: {
			page,
			page_size: 10,
			start_date: startDate.toISOString().split('T')[0],
			end_date: endDate.toISOString().split('T')[0],
			search: searchQuery,
			ordering: `${sorting.order === 'asc' ? '' : '-'}${sorting.field}`,
		},
	});
	return response.data;
};

const useUsersFiltered = (page, startDate, endDate, searchQuery, sorting) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isAdmin = useSelector((state) => state.auth.isAdmin);
	const api = useApi();

	return useQuery({
		queryKey: [
			'filteredUsers',
			page,
			startDate,
			endDate,
			searchQuery,
			sorting,
		],
		queryFn: () =>
			fetchUsers(api, page, startDate, endDate, searchQuery, sorting),
		enabled: isAuthenticated && isAdmin,
		staleTime: 60000,
		cacheTime: 300000,
		refetchOnWindowFocus: false,
		retry: 1,
	});
};

export default useUsersFiltered;
