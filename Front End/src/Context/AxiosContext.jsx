import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { requestNewToken } from './HelperApi/axiosHelpers';
import { useDispatch } from 'react-redux';
import { logout } from '../Store/authSlice';

// Create the ApiContext
const ApiContext = createContext();
// Create the Axios instance
const createApi = () => {
	const dispatch = useDispatch();
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
			const originalRequest = error.config;
			if (error.response.status === 401) {
				if (!originalRequest._retry) {
					originalRequest._retry = true;
					try {
						const refreshToken =
							localStorage.getItem('refreshToken');
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
							return api(originalRequest);
						}
					} catch (err) {
						console.log(
							'Refresh token expired or blacklisted:',
							err
						);
						dispatch(logout());
						localStorage.removeItem('accessToken');
						localStorage.removeItem('refreshToken');
						localStorage.removeItem('user');
						return Promise.reject(err);
					}
				} else {
					// Token has been blacklisted or refresh failed
					console.log('Token has been blacklisted');
					dispatch(logout());
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					localStorage.removeItem('user');
					return Promise.reject(error);
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
