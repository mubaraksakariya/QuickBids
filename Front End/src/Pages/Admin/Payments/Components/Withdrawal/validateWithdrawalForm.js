const validateWithdrawalForm = (formValues) => {
	const errors = {};

	// Validate status
	if (!formValues.status) {
		errors.status = 'Status is required';
	} else if (
		!['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'FAILED'].includes(
			formValues.status
		)
	) {
		errors.status = 'Invalid status value';
	}

	// Validate failure reason if status is REJECTED or FAILED
	if (['REJECTED', 'FAILED'].includes(formValues.status)) {
		if (
			!formValues.failure_reason ||
			formValues.failure_reason.trim() === ''
		) {
			errors.failure_reason = 'Failure reason is required';
		}
	}

	return errors;
};

export default validateWithdrawalForm;
