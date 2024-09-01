export const validateAdminLogin = ({ email, password }) => {
	let errors = {};

	if (!email || email.trim().length === 0) {
		errors.email = 'email is required';
	}

	if (!password || password.length < 6) {
		errors.password = 'Password must be at least 6 characters';
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors,
	};
};
