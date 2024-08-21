import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ApiProvider } from './Context/AxiosContext.jsx';
import { Provider } from 'react-redux';
import store from './Store/store.js';
import AuthProvider from './Context/AuthContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorProvider } from './Context/ErrorContext.jsx';
import { NotificationProvider } from './Context/NotificationContext.jsx';
import { ProductProvider } from './Context/ProductContext.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
	<Provider store={store}>
		<ApiProvider>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<ErrorProvider>
						<NotificationProvider>
							<ProductProvider>
								<App />
							</ProductProvider>
						</NotificationProvider>
					</ErrorProvider>
				</QueryClientProvider>
			</AuthProvider>
		</ApiProvider>
	</Provider>
	// </React.StrictMode>
);
