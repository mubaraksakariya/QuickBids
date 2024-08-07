import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
	name: 'notifications',
	initialState: { notifications: [] },
	reducers: {
		addNotification: (state, action) => {
			state.notifications.unshift(action.payload);
		},
		addNotifications: (state, action) => {
			state.notifications = [...action.payload];
		},
		markNotificationRead: (state, action) => {
			state.notifications = state.notifications.map((notification) =>
				notification.id === action.payload
					? { ...notification, is_read: true }
					: notification
			);
			console.log('marked as read');
		},
		removeNotification: (state, action) => {
			state.notifications = state.notifications.filter(
				(notification) => notification.id !== action.payload
			);
		},
		clearNotifications: (state) => {
			state.notifications = [];
		},
	},
});

export const {
	addNotification,
	addNotifications,
	markNotificationRead,
	removeNotification,
	clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
