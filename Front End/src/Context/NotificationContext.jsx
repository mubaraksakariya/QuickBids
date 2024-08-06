import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNotifications } from '../Store/notificationSlice';
import useApi from './AxiosContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const dispatch = useDispatch();
	const api = useApi();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const getNotification = async () => {
		try {
			const response = await api.get('/api/notifications');
			dispatch(addNotifications(response.data));
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (isAuthenticated) getNotification();
	}, [dispatch, isAuthenticated]);

	const contextValue = {};

	return (
		<NotificationContext.Provider value={contextValue}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotificationsContext = () => {
	const context = useContext(NotificationContext);
	if (context === undefined) {
		throw new Error(
			'useNotificationsContext must be used within a NotificationProvider'
		);
	}
	return context;
};
