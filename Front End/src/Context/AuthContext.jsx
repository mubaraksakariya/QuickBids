// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../Store/authSlice';
// import { login, logout } from './authSlice';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const storedAccessToken = localStorage.getItem('accessToken');
	const storedRefreshToken = localStorage.getItem('refreshToken');
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const [isLoading, setIsloading] = useState(true);

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
		if (!storedAccessToken && !storedRefreshToken && !storedUser) {
			dispatch(logout());
		}
	}, [storedAccessToken, storedRefreshToken, storedUser]);

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthProvider;
