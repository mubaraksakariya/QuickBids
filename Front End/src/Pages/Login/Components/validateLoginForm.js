const validateLoginForm = (formData) => {
	let isValid = true;
	let errors = {};

	if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
		isValid = false;
		errors.email = 'Invalid email format';
	}

	if (!formData.password || formData.password.length < 8) {
		isValid = false;
		errors.password = 'Password must be at least 8 characters long';
	}
	return { isValid, errors };
};
export { validateLoginForm };
