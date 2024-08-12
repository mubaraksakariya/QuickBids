import { useMutation } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';
import { useDispatch } from 'react-redux';
import { updateUser } from '../Store/authSlice';

const updateCurrentUser = async (userData, api) => {
	const response = await api.patch(`/api/users/update-user/`, userData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return response.data;
};

const useUpdateUser = () => {
	const api = useApi();
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: (userData) => updateCurrentUser(userData, api),
		onSuccess: (data) => {
			dispatch(updateUser({ user: data }));
			// console.log('User updated successfully:', data);
		},
		onError: (error) => {
			// Handle error
			console.error('Error updating user:', error);
		},
	});
};

export default useUpdateUser;
