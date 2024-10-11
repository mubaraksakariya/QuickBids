import { useMutation } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { useDispatch } from 'react-redux';
import { updateUser } from '../Store/authSlice';

const updateUserData = async (userId, userData, api) => {
	if (!userData) {
		console.log('User data is null or undefined');
		return null;
	}

	console.log('User data:', userData);

	const response = await api.patch(
		`/api/users/${userId}/update-data/`,
		userData,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	);
	return response.data;
};

const useUpdateUserData = () => {
	const api = useApi();

	return useMutation({
		mutationFn: (data) => {
			const { userId, userData } = data;
			return updateUserData(userId, userData, api);
		},
		onSuccess: (data) => {
			console.log('User updated successfully:', data);
		},
		onError: (error) => {
			console.error('Error updating user:', error);
		},
	});
};

export default useUpdateUserData;
