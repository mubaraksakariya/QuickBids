import React, { useState } from 'react';
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
import useApi from '../../Context/AxiosContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Components/Utilities/Model';

function CreateProduct() {
	const [isLoading, setIsLoading] = useState(false);
	const [isCreationSuccess, setIsCreationSuccess] = useState(false);
	const navigate = useNavigate();
	const api = useApi();
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

	const handleSubmit = async () => {
		setIsLoading(true);
		const validationErrors = validate(formState);
		if (Object.keys(validationErrors).length === 0) {
			try {
				// Step 1: Create Product, with new or existing category
				const productData = {
					category: formState.category,
					title: formState.title,
					description: formState.description,
					initial_prize: formState.initialPrize,
					buy_now_prize: formState.buyNowPrize,
					selected_state: formState.selectedState,
					current_location: formState.currentLocation
						? JSON.stringify(formState.currentLocation)
						: null,
					start_date: formState.startDate,
					end_date: formState.endDate,
				};
				console.log('Product Data:', productData);

				const productResponse = await api.post(
					'/api/products/',
					productData
				);
				const product = productResponse.data;
				console.log('Product Created:', product);

				// Step 2: Upload Images
				if (formState.images.length > 0) {
					const formData = new FormData();
					formState.images.forEach((image, index) => {
						formData.append(`images[${index}]`, image);
					});

					const uploadResponse = await api.post(
						`/api/product-images/upload/${product.id}/`,
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
							},
						}
					);
					console.log('Image Upload Response:', uploadResponse);
				}

				console.log('Product created successfully with images');
			} catch (error) {
				console.error(
					'Error creating product:',
					error.response ? error.response.data : error.message
				);
			} finally {
				setIsLoading(false);
				setIsCreationSuccess(true);
				// navigate('/');
			}
		} else {
			console.log('Form has errors. Please fix them.');
			console.log(validationErrors);
			setIsLoading(false);
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
						error={errors.initialPrize}
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
							disabled={isLoading}
							className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'>
							{isLoading ? 'Wait' : 'Submit'}
						</button>
					</div>
				</div>
			</div>
			<Modal
				show={isCreationSuccess}
				onClose={() => navigate('/')}
				autoCloseAfter={5000}>
				<h2 className='text-2xl font-bold mb-4 text-center'>
					Congratulations !!
				</h2>
				<p>Bidding on your Product will start on time</p>
			</Modal>
		</div>
	);
}

export default CreateProduct;
