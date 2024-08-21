import React, { createContext, useContext, useState } from 'react';
import ErrorModal from '../Components/Models/ErrorModal';

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
	const [error, setError] = useState(null);

	const showError = (message) => {
		setError(message);
	};

	const hideError = () => {
		setError(false);
	};

	return (
		<ErrorContext.Provider value={{ error, showError, hideError }}>
			{children}
			{error && <ErrorModal message={error} onClose={hideError} />}
		</ErrorContext.Provider>
	);
};
