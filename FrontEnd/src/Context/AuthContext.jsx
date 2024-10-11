// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, updateUser } from '../Store/authSlice';
import useApi from './AxiosContext';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const [isLoading, setIsloading] = useState(true);
	const storedAccessToken = localStorage.getItem('accessToken');
	const storedRefreshToken = localStorage.getItem('refreshToken');
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const dispatch = useDispatch();
	const api = useApi();

	const setUser = async () => {
		const response = await api.get('api/users/logged_in_user/');
		const user = response.data;
		// console.log(user);
		dispatch(updateUser({ user }));
	};
	useEffect(() => {
		if (isAuthenticated == null && user == null) setIsloading(true);
		else setIsloading(false);
	}, [isAuthenticated, storedUser]);
	// Initialize authentication state from localStorage on app start
	useEffect(() => {
		if (storedAccessToken && storedRefreshToken) {
			dispatch(
				login({
					accessToken: storedAccessToken,
					refreshToken: storedRefreshToken,
					// user: storedUser,
				})
			);
		}
		setUser();
	}, []);

	// Handle logout on localStorage change (e.g., user logs out)
	useEffect(() => {
		// update user, when not updated incase, eg: when loged in
		if (storedRefreshToken && !storedUser) {
			setUser();
		}
	}, [storedAccessToken, storedRefreshToken, storedUser]);

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthProvider;
