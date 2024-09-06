import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { useSelector } from 'react-redux';

const fetchAllUsers = async (
	api,
	searchQuery,
	sorting,
	fromDate,
	toDate,
	page,
	pageSize
) => {
	const params = {
		page,
		page_size: pageSize,
		search: searchQuery,
		ordering: `${sorting.order === 'asc' ? '' : '-'}${sorting.field}`,
		from_date: fromDate,
		to_date: toDate,
	};
	const response = await api.get('/api/users/', { params });
	return response.data;
};

// Custom hook for fetching all users
const useAllUsers = (
	searchQuery = '',
	fromDate = '',
	toDate = '',
	page = 1,
	pageSize = 10,
	sorting
) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isAdmin = useSelector((state) => state.auth.isAdmin);
	const api = useApi();

	return useQuery({
		queryKey: [
			'allUsers',
			searchQuery,
			sorting,
			fromDate,
			toDate,
			page,
			pageSize,
		],
		queryFn: () =>
			fetchAllUsers(
				api,
				searchQuery,
				sorting,
				fromDate,
				toDate,
				page,
				pageSize
			),
		enabled: isAuthenticated && isAdmin,
		retry: 1,
	});
};

export default useAllUsers;
