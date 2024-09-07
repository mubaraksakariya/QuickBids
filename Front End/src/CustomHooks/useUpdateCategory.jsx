import { useMutation } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { useError } from '../Context/ErrorContext';

// Function to handle category update
const updateCategory = async (api, categoryId, formData) => {
	const response = await api.patch(
		`api/categories/${categoryId}/`,
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	);
	return response.data;
};

// Custom hook for updating a category
const useUpdateCategory = () => {
	const api = useApi();
	const { showError } = useError();

	return useMutation({
		mutationFn: (categoryData) =>
			updateCategory(api, categoryData.categoryId, categoryData.formData),
		// onError: (error) => {
		// 	console.log(error);

		// 	showError(error.message || 'Failed to update category');
		// },
	});
};

export default useUpdateCategory;
