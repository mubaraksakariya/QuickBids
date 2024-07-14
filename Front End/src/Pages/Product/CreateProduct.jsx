import React from 'react';
import Nav from './Components/Nav';
import CategoryInput from './Components/CategoryInput';
import ProductDetails from './Components/ProductDetails';
import PriceInput from './Components/PriceInput';
import ImageGridInput from './Components/ImageGridInput';
import Location from './Components/Location';
import DateRangeInput from './Components/DateRangeInput';

import {
	validateCategory,
	validateTitle,
	validateDates,
	validatePrices,
	validateImages,
	validateLocation,
} from './Utils/ProductCreationFormValidators';
import useFormState from '../../CustomHooks/useFormState';
import useValidation from '../../CustomHooks/useValidation';

function CreateProduct() {
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
		// startDate: () => validateDates(formState.startDate, formState.endDate),
		// endDate: () => validateDates(formState.startDate, formState.endDate),
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

	const handleSubmit = () => {
		const validationErrors = validate(formState);
		if (Object.keys(validationErrors).length === 0) {
			const formData = new FormData();
			for (const [key, value] of Object.entries(formState)) {
				console.log(key, ' : ', value);
				if (key === 'images') {
					value.forEach((image, index) => {
						formData.append(`image${index}`, image);
					});
				} else {
					formData.append(key, value);
				}
			}
			console.log('Form Data:', formData);
		} else {
			console.log('Form has errors. Please fix them.');
			console.log(validationErrors);
		}
	};

	return (
		<div className='min-h-screen w-full lg:w-4/5 mx-auto'>
			<Nav />
			<h1 className='text-center text-2xl font-bold my-4'>
				Create Your Ad
			</h1>
			<div className='flex justify-center py-4'>
				<div className='flex flex-col justify-center items-center gap-8 flex-1 max-w-lg'>
					<CategoryInput
						setCategory={(value) =>
							handleChange({
								target: { name: 'category', value },
							})
						}
						category={formState.category}
						error={errors.category}
					/>
					<ProductDetails
						title={formState.title}
						setTitle={(value) =>
							handleChange({ target: { name: 'title', value } })
						}
						description={formState.description}
						setDescription={(value) =>
							handleChange({
								target: { name: 'description', value },
							})
						}
						error={errors.title}
					/>
					<DateRangeInput
						startDate={formState.startDate}
						setStartDate={(value) =>
							handleChange({
								target: { name: 'startDate', value },
							})
						}
						endDate={formState.endDate}
						setEndDate={(value) =>
							handleChange({ target: { name: 'endDate', value } })
						}
						// startDateError={errors.startDate}
						// endDateError={errors.endDate}
					/>
					<PriceInput
						initialPrize={formState.initialPrize}
						setInitialPrize={(value) =>
							handleChange({
								target: { name: 'initialPrize', value },
							})
						}
						buyNowPrize={formState.buyNowPrize}
						setBuyNowPrize={(value) =>
							handleChange({
								target: { name: 'buyNowPrize', value },
							})
						}
						// error={errors.initialPrize}
					/>
					<ImageGridInput
						images={formState.images}
						setImages={(value) =>
							handleChange({ target: { name: 'images', value } })
						}
						error={errors.images}
					/>
					<Location
						selectedState={formState.selectedState}
						setSelectedState={(value) =>
							handleChange({
								target: { name: 'selectedState', value },
							})
						}
						currentLocation={formState.currentLocation}
						setCurrentLocation={(value) =>
							handleChange({
								target: { name: 'currentLocation', value },
							})
						}
						error={errors.location}
					/>
					<div className='w-full flex justify-start mt-4'>
						<button
							onClick={handleSubmit}
							className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateProduct;
