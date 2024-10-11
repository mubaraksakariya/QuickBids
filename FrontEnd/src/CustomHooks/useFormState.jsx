import { useState } from 'react';

const useFormState = (initialState) => {
	const [formState, setFormState] = useState(initialState);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return [formState, handleChange];
};

export default useFormState;
