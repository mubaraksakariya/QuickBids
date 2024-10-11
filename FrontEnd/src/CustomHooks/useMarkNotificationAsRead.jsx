import { useMutation } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const markNotificationAsRead = async ({ api, notificationId }) => {
	try {
		const response = await api.patch(
			`/api/notifications/${notificationId}/mark-as-read/`
		);
		return response.data;
	} catch (error) {
		throw new Error('Failed to mark notification as read');
	}
};

const useMarkNotificationAsRead = () => {
	const api = useApi();

	return useMutation({
		mutationFn: (notificationId) =>
			markNotificationAsRead({ api, notificationId }),
		onSuccess: (data) => {
			console.log('Notification marked as read successfully:', data);
		},
		onError: (error) => {
			console.error('Error marking notification as read:', error);
		},
	});
};

export default useMarkNotificationAsRead;
