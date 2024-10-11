const validateForm = (formData) => {
	let isValid = true;
	let errors = {};

	// Field Validation Logic
	if (!formData.firstName) {
		isValid = false;
		errors.firstName = 'First Name is required';
	}

	if (!formData.lastName) {
		isValid = false;
		errors.lastName = 'Last Name is required';
	}

	if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
		isValid = false;
		errors.email = 'Invalid email format';
	}

	if (!formData.password || formData.password.length < 8) {
		isValid = false;
		errors.password = 'Password must be at least 8 characters long';
	}

	if (!formData.repassword || formData.repassword !== formData.password) {
		isValid = false;
		errors.repassword = 'Passwords do not match';
	}

	return { isValid, errors };
};

export { validateForm };
