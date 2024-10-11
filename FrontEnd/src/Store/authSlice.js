import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false,
		accessToken: null,
		refreshToken: null,
		user: null,
		isAdmin: false,
	},
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
			state.isAdmin = action.payload.isAdmin || false;
			localStorage.setItem('accessToken', action.payload.accessToken);
			localStorage.setItem('refreshToken', action.payload.refreshToken);
			// localStorage.setItem('isAdmin', state.isAdmin);
			if (action.payload.user) {
				state.user = action.payload.user;
				localStorage.setItem(
					'user',
					JSON.stringify(action.payload.user)
				);
			}
		},
		updateUser: (state, action) => {
			if (action.payload.user) {
				state.user = action.payload.user;
				localStorage.setItem(
					'user',
					JSON.stringify(action.payload.user)
				);
				state.isAdmin =
					action.payload.user.is_superuser || state.isAdmin; // Update isAdmin if provided
			}
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.accessToken = null;
			state.refreshToken = null;
			state.user = null;
			state.isAdmin = false; // Reset isAdmin on logout
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('user');
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
