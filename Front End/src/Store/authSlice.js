import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false,
		accessToken: null,
		refreshToken: null,
		user: null,
	},
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			// console.log(action.payload);
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
			localStorage.setItem('accessToken', action.payload.accessToken);
			localStorage.setItem('refreshToken', action.payload.refreshToken);
			if (action.payload.user) {
				state.user = action.payload.user;
				localStorage.setItem(
					'user',
					JSON.stringify(action.payload.user)
				);
			}
		},
		update_user: (state, action) => {
			if (action.payload.user) {
				state.user = action.payload.user;
				localStorage.setItem(
					'user',
					JSON.stringify(action.payload.user)
				);
			}
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.accessToken = null;
			state.refreshToken = null;
			state.user = null;
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('user');
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout, update_user } = authSlice.actions;

export default authSlice.reducer;