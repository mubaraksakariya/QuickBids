import { useMutation } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const buyNow = async ({ api, productId }) => {
	try {
		const response = await api.post('/api/products/buy-now/', {
			product_id: productId,
		});
		return response.data;
	} catch (error) {
		throw new Error('Failed to complete the Buy Now operation');
	}
};

const useBuyNow = () => {
	const api = useApi();

	return useMutation({
		mutationFn: (productId) => buyNow({ api, productId }),
		onSuccess: (data) => {
			console.log('Buy Now successful:', data);
			// Handle success, e.g., navigate, show a message, etc.
		},
		onError: (error) => {
			console.error('Error during Buy Now:', error);
			// Handle error, e.g., show an error message
		},
	});
};

export default useBuyNow;
