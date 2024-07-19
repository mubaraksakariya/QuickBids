import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchCategories = async (api) => {
	const response = await api.get('/api/categories/');
	return response.data;
};

const useCategories = () => {
	const api = useApi();
	return useQuery({
		queryKey: ['categories'],
		queryFn: () => fetchCategories(api),
	});
};

export default useCategories;
