export const validateFormValues = (formValues) => {
	let errors = {};

	if (!formValues.title) {
		errors = 'Title is required';
	}

	if (!formValues.category) {
		errors = 'Category is required';
	}

	if (
		!formValues.buyNowPrice ||
		isNaN(formValues.buyNowPrice) ||
		formValues.buyNowPrice <= 0
	) {
		errors = 'Buy Now Price must be a positive number';
	}

	if (
		!formValues.initialPrize ||
		isNaN(formValues.initialPrize) ||
		formValues.initialPrize <= 0
	) {
		errors = 'Initial Prize must be a positive number';
	}

	// if (!formValues.startDate || new Date(formValues.startDate) <= new Date()) {
	// 	errors.startDate = 'Start Date must be in the future';
	// }

	if (
		!formValues.endDate ||
		new Date(formValues.endDate) <= new Date(formValues.startDate)
	) {
		errors = 'End Date must be after the Start Date';
	}

	if (!formValues.status) {
		errors = 'Status is required';
	}

	return errors;
};
