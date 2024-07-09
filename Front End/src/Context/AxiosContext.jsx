import React, { createContext, useContext } from 'react';
import axios from 'axios';

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
			const token = localStorage.getItem('accessToken');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
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
