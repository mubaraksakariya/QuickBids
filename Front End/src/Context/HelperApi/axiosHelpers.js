import axios from 'axios';

const requestNewToken = async (refreshToken) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_SERVER_BASE_URL}/api/refresh/`,
			{
				refresh: refreshToken,
			}
		);
		localStorage.setItem('accessToken', response.data.access);
		localStorage.setItem('refreshToken', response.data.refresh);
		return response.data.access;
	} catch (error) {
		console.error('Error refreshing token:', error);
		throw error;
	}
};
export { requestNewToken };
