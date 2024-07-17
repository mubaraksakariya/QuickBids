import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ApiProvider } from './Context/AxiosContext.jsx';
import { Provider } from 'react-redux';
import store from './Store/store.js';
import AuthProvider from './Context/AuthContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<ApiProvider>
		<Provider store={store}>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</AuthProvider>
		</Provider>
	</ApiProvider>
	// </React.StrictMode>
);
