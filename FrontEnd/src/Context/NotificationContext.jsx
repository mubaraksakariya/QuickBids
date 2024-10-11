import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addNotification,
	addNotifications,
	markNotificationRead,
} from '../Store/notificationSlice';
import useApi from './AxiosContext';
import useWebSocket from '../CustomHooks/useWebSocket';
import useMarkNotificationAsRead from '../CustomHooks/useMarkNotificationAsRead';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const dispatch = useDispatch();
	const api = useApi();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const { mutate: markAsRead } = useMarkNotificationAsRead();

	const getRecentNotifications = async () => {
		try {
			const response = await api.get('/api/notifications/recent');
			dispatch(addNotifications(response.data));
		} catch (error) {
			console.log(error);
		}
	};

	const socketUrl = `notifications/`;
	const socketKey = 'notifications';

	const handleOpen = () => {
		console.log(`Connected to notifications`);
	};

	const handleClose = () => {
		console.log(`Disconnected from notifications`);
	};

	const handleError = (error) => {
		console.log('WebSocket error:', error);
	};

	const handleMessage = (event) => {
		const message = JSON.parse(event.data);
		const notificationData = message.notification;
		if (notificationData) {
			dispatch(addNotification(notificationData));
		}
	};

	useWebSocket(
		socketKey,
		socketUrl,
		handleMessage,
		handleOpen,
		handleClose,
		handleError
	);

	const manageMarkAsRead = (notification) => {
		if (!notification.is_read) {
			markAsRead(notification.id);
			dispatch(markNotificationRead(notification.id));
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			getRecentNotifications();
		}
	}, [dispatch, isAuthenticated]);

	const contextValue = { manageMarkAsRead };

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
