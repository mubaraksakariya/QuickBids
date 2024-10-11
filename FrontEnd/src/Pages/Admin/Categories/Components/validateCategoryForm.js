export const validateCategoryForm = (formValues) => {
	let errors = {};

	// Check for category name
	if (!formValues.name || formValues.name.trim() === '') {
		errors.name = 'Category name is required';
	}

	// // Check for category description (optional, can be required based on your needs)
	// if (!formValues.description || formValues.description.trim() === '') {
	// 	errors.description = 'Category description is required';
	// }

	// Check for image if needed (optional validation)
	if (!formValues.image && formValues.image_required) {
		errors.image = 'Category image is required';
	}

	return errors;
};
