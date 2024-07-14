import { useState } from 'react';

const useValidation = (validators) => {
	const [errors, setErrors] = useState({});

	const validate = (values) => {
		const newErrors = {};
		for (const [field, validator] of Object.entries(validators)) {
			const error = validator(values[field], values);
			if (error) newErrors[field] = error;
		}
		setErrors(newErrors);
		return newErrors;
	};

	return [errors, validate];
};

export default useValidation;
