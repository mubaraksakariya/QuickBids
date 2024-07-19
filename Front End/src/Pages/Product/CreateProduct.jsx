import React from 'react';
import Nav from './Components/Nav';
import CategoryInput from './Components/CategoryInput';
import ProductDetails from './Components/ProductDetails';
import PriceInput from './Components/PriceInput';
import ImageGridInput from './Components/ImageGridInput';
import Location from './Components/Location';
import DateRangeInput from './Components/DateRangeInput';
import Modal from '../../Components/Utilities/Model';
import { useNavigate } from 'react-router-dom';
import useProductForm from './Hooks/useProductForm';
import useCreateProduct from './Hooks/useCreateProduct';

function CreateProduct() {
	const navigate = useNavigate();
	const { formState, handleChange, errors, validate } = useProductForm();
	const { isLoading, isCreationSuccess, createProduct } = useCreateProduct();

	const handleSubmit = () => {
		createProduct(formState, validate, navigate);
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
						error={errors.endDate}
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
