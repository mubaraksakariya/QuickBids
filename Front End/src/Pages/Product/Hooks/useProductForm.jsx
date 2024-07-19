import useFormState from '../../../CustomHooks/useFormState';
import useValidation from '../../../CustomHooks/useValidation';
import {
	validateCategory,
	validateTitle,
	validateDates,
	validatePrices,
	validateImages,
	validateLocation,
} from '../Utils/ProductCreationFormValidators';

const useProductForm = () => {
	const [formState, handleChange] = useFormState({
		category: '',
		title: '',
		description: '',
		initialPrize: 0,
		buyNowPrize: 0,
		images: [],
		selectedState: '',
		currentLocation: null,
		startDate: '',
		endDate: '',
	});

	const validators = {
		category: validateCategory,
		title: validateTitle,
		endDate: () => validateDates(formState.startDate, formState.endDate),
		initialPrize: () =>
			validatePrices(formState.initialPrize, formState.buyNowPrize),
		images: () => validateImages(formState.images),
		location: () =>
			validateLocation(
				formState.selectedState,
				formState.currentLocation
			),
	};

	const [errors, validate] = useValidation(validators);

	return { formState, handleChange, errors, validate };
};

export default useProductForm;
