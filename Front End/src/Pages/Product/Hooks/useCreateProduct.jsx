import { useState } from 'react';
import useApi from '../../../Context/AxiosContext';

const useCreateProduct = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isCreationSuccess, setIsCreationSuccess] = useState(false);
	const api = useApi();

	const createProduct = async (formState, validate, navigate) => {
		setIsLoading(true);
		const validationErrors = validate(formState);
		if (Object.keys(validationErrors).length === 0) {
			try {
				// Step 1: Create Product
				const productData = {
					category: formState.category,
					title: formState.title,
					description: formState.description,
					initial_prize: formState.initialPrize,
					buy_now_prize: formState.buyNowPrize,
					selected_state: formState.selectedState,
					current_location: formState.currentLocation
						? JSON.stringify(formState.currentLocation)
						: null,
					start_time: formState.startDate,
					end_time: formState.endDate,
				};
				const productResponse = await api.post(
					'/api/products/',
					productData
				);
				const product = productResponse.data;

				// Step 2: Upload Images
				if (formState.images.length > 0) {
					const formData = new FormData();
					formState.images.forEach((image, index) => {
						formData.append(`images[${index}]`, image);
					});

					await api.post(
						`/api/product-images/upload/${product.id}/`,
						formData,
						{
							headers: { 'Content-Type': 'multipart/form-data' },
						}
					);
				}

				setIsCreationSuccess(true);
				navigate('/');
			} catch (error) {
				console.error(
					'Error creating product:',
					error.response ? error.response.data : error.message
				);
			} finally {
				setIsLoading(false);
			}
		} else {
			console.log('Form has errors. Please fix them.', validationErrors);
			setIsLoading(false);
		}
	};

	return { isLoading, isCreationSuccess, createProduct };
};

export default useCreateProduct;
