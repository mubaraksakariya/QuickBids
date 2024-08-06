import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
	name: 'notifications',
	initialState: {
		notifications: [
			{
				id: 1,
				message: 'You have a new message from John Doe.',
				timestamp: '2024-08-10T12:00:00Z',
			},
			{
				id: 2,
				message: 'Your bid on the auction has been outbid.',
				timestamp: '2024-08-10T13:00:00Z',
			},
			{
				id: 3,
				message: 'New comment on your product listing.',
				timestamp: '2024-08-10T14:00:00Z',
			},
		],
	},
	reducers: {
		addNotification: (state, action) => {
			state.notifications.push(action.payload);
		},
		addNotifications: (state, action) => {
			state.notifications = [...action.payload];
		},
		markNotificationRead: (state, action) => {
			state.notifications = state.notifications.map((notification) =>
				notification.id === action.payload
					? { ...notification, read: true }
					: notification
			);
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
