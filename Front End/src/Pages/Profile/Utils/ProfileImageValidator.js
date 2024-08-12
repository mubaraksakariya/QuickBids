export const validateImageFile = (file, maxSizeInMB = null) => {
	const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
	if (!validImageTypes.includes(file.type)) {
		return {
			isValid: false,
			errorMessage: 'Please upload a valid image file (JPEG, PNG, GIF).',
		};
	}

	// Validate file size
	if (maxSizeInMB && file.size > maxSizeInMB * 1024 * 1024) {
		return {
			isValid: false,
			errorMessage: `File size should not exceed ${maxSizeInMB} MB.`,
		};
	}

	// If all validations pass
	return {
		isValid: true,
		errorMessage: null,
	};
};
