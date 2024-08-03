import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { requestNewToken } from './HelperApi/axiosHelpers';

// Create the ApiContext
const ApiContext = createContext();
// Create the Axios instance
const createApi = () => {
	const api = axios.create({
		baseURL: import.meta.env.VITE_SERVER_BASE_URL,
		// Other Axios configurations here
	});

	// Add a request interceptor to include the access token
	api.interceptors.request.use(
		(config) => {
			const accessToken = localStorage.getItem('accessToken');
			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// Add a response interceptor to handle token refreshing
	api.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			// console.log(error);
			const originalRequest = error.config;
			if (error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				try {
					const refreshToken = localStorage.getItem('refreshToken');
					localStorage.removeItem('accessToken');
					if (refreshToken) {
						const newAccessToken = await requestNewToken(
							refreshToken
						);
						localStorage.setItem('accessToken', newAccessToken);
						axios.defaults.headers.common[
							'Authorization'
						] = `Bearer ${newAccessToken}`;
						originalRequest.headers[
							'Authorization'
						] = `Bearer ${newAccessToken}`;
					}
					return api(originalRequest);
				} catch (err) {
					// Handle refresh token expiration (e.g., logout the user)
					console.error('Refresh token expired:', err);
					// Clear localStorage and redirect to login
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					// window.location.href = '/login'; // or any logout function
					return Promise.reject(err);
				}
			}
			// Extract error message from response
			const errorMessage =
				error.response?.data?.detail || 'An error occurred';
			return Promise.reject(new Error(errorMessage));
		}
	);

	return api;
};

// Create the ApiProvider component
export const ApiProvider = ({ children }) => {
	const api = createApi();

	return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

// Custom hook to use the API context
const useApi = () => {
	const api = useContext(ApiContext);
	if (!api) {
		throw new Error('useApi must be used within an ApiProvider');
	}
	return api;
};

export default useApi;
