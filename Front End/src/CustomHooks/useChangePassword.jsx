import { useMutation } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const changePassword = async (passwords, api) => {
	const response = await api.patch(`api/users/change-password/`, passwords);
	return response.data;
};

const useChangePassword = () => {
	const api = useApi();

	return useMutation({
		mutationFn: (passwords) => changePassword(passwords, api),
		onSuccess: (data) => {
			console.log('Password updated successfully:', data);
		},
		onError: (error) => {
			console.error('Error changing password:', error);
			console.log(error.message);
		},
	});
};

export default useChangePassword;
