export const validateUserFormValues = (formValues) => {
	let errors = {};

	// Validate First Name
	if (!formValues.first_name) {
		errors.first_name = 'First name is required';
	}

	if (!/\S+@\S+\.\S+/.test(formValues.email)) {
		errors.email = 'Email is invalid';
	}

	// Validate Auth Provider
	if (!formValues.auth_provider) {
		errors.auth_provider = 'Auth provider is required';
	} else if (!['local', 'google'].includes(formValues.auth_provider)) {
		errors.auth_provider =
			'Auth provider must be either "local" or "google"';
	}

	// Validate Is Blocked
	if (typeof formValues.is_blocked !== 'boolean') {
		errors.is_blocked = 'Block status must be a boolean value';
	}

	return errors;
};
