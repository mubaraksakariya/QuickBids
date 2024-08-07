import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, addNotifications } from '../Store/notificationSlice';
import useApi from './AxiosContext';
import useWebSocket from '../CustomHooks/useWebSocket';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const dispatch = useDispatch();
	const api = useApi();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	// Function to fetch notifications from the API
	const getNotification = async () => {
		try {
			const response = await api.get('/api/notifications/recent');
			dispatch(addNotifications(response.data));
		} catch (error) {
			console.log(error);
		}
	};

	// Set up WebSocket connection
	const webSocketBaseUrl = import.meta.env.VITE_WEB_SOCKET_BASE_URL;
	const socketUrl = `${webSocketBaseUrl}/notifications/`;
	const socketKey = 'notifications';
	const handleOpen = () => {
		console.log(`Connected to notifications `);
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
		// console.log(notificationData);
		if (notificationData) {
			dispatch(addNotification(notificationData));
		}
	};
	// Connect to WebSocket, Use the WebSocket hook
	useWebSocket(
		socketKey,
		socketUrl,
		handleMessage,
		handleOpen,
		handleClose,
		handleError
	);

	useEffect(() => {
		if (isAuthenticated) {
			// Fetch initial notifications
			getNotification();
		}
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
