import { useMutation } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { useError } from '../Context/ErrorContext';

const createCategory = async (api, categoryData) => {
	const response = await api.post('/api/admin/categories/', categoryData);
	return response.data;
};

const useCreateCategory = () => {
	const api = useApi();
	const { showError } = useError();

	return useMutation({
		mutationFn: (categoryData) => createCategory(api, categoryData),
		onSuccess: (data) => {
			// Handle success case if needed
			console.log('Category created or fetched successfully:', data);
		},
		onError: (error) => {
			showError(error.message);
		},
	});
};

export default useCreateCategory;
