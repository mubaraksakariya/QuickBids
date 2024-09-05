import { useMutation } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { useError } from '../Context/ErrorContext';
// You can import or define actions related to updating auction/product states in Redux if needed.

const updateProductAndAuction = async (auctionId, formData, api) => {
	const response = await api.patch(
		`/api/products/${auctionId}/update-product-auction/`,
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	);
	return response.data;
};

const useUpdateProductAndAuction = () => {
	const api = useApi();
	const { showError } = useError();

	return useMutation({
		mutationFn: ({ auctionId, formData }) =>
			updateProductAndAuction(auctionId, formData, api),
		onSuccess: (data) => {
			// Handle successful update
			console.log('Product and Auction updated successfully:', data);
		},
		onError: (error) => {
			// Handle error
			console.log('Error updating product and auction:', error.message);
			showError(error.message);
		},
	});
};

export default useUpdateProductAndAuction;
