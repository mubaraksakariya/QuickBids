import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
	name: 'notifications',
	initialState: {
		notifications: [],
		unreadCount: 0,
	},
	reducers: {
		addNotification: (state, action) => {
			state.notifications.unshift(action.payload);
			if (!action.payload.is_read) {
				state.unreadCount += 1;
			}
		},
		addNotifications: (state, action) => {
			state.notifications = [...action.payload];
			state.unreadCount = action.payload.filter((n) => !n.is_read).length;
		},
		markNotificationRead: (state, action) => {
			state.notifications = state.notifications.map((notification) =>
				notification.id === action.payload
					? { ...notification, is_read: true }
					: notification
			);
			state.unreadCount = state.notifications.filter(
				(n) => !n.is_read
			).length;
		},
		updateUnreadCount: (state) => {
			state.unreadCount = state.notifications.filter(
				(notification) => !notification.is_read
			).length;
		},
		removeNotification: (state, action) => {
			state.notifications = state.notifications.filter(
				(notification) => notification.id !== action.payload
			);
			state.unreadCount = state.notifications.filter(
				(n) => !n.is_read
			).length;
		},
		clearNotifications: (state) => {
			state.notifications = [];
			state.unreadCount = 0;
		},
	},
});

export const {
	addNotification,
	addNotifications,
	markNotificationRead,
	removeNotification,
	clearNotifications,
	updateUnreadCount,
} = notificationSlice.actions;

export default notificationSlice.reducer;
