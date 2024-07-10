// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, update_user } from '../Store/authSlice';
import useApi from './AxiosContext';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [isLoading, setIsloading] = useState(true);
	const storedAccessToken = localStorage.getItem('accessToken');
	const storedRefreshToken = localStorage.getItem('refreshToken');
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const dispatch = useDispatch();
	const api = useApi();

	const updateUser = async () => {
		const response = await api.get('api/users/logged_in_user/');
		const user = response.data;
		// console.log(user);
		dispatch(update_user({ user }));
	};
	useEffect(() => {
		if (isAuthenticated == null) setIsloading(true);
		else setIsloading(false);
	}, [isAuthenticated]);
	// Initialize authentication state from localStorage on app start
	useEffect(() => {
		if (storedAccessToken && storedRefreshToken && storedUser) {
			dispatch(
				login({
					accessToken: storedAccessToken,
					refreshToken: storedRefreshToken,
					user: storedUser,
				})
			);
		}
	}, []);

	// Handle logout on localStorage change (e.g., user logs out)
	useEffect(() => {
		if (!storedAccessToken && !storedRefreshToken) {
			dispatch(logout());
		}
		// update user, when not updated incase, eg: when loged in
		if (storedRefreshToken && !storedUser) {
			updateUser();
		}
	}, [storedAccessToken, storedRefreshToken, storedUser]);

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthProvider;
