import React, { useEffect, useState } from 'react';
import useAuctionById from '../../../../CustomHooks/useAuctionById';

import { useError } from '../../../../Context/ErrorContext';
import EditInputs from '../../../Admin/Products/Components/EditInputs';
import ImageManager from '../../../Admin/Products/Components/ImageManager';
import { validateFormValues } from '../../../Admin/Products/Components/formValidation';
import useUpdateProductAndAuction from '../../../../CustomHooks/useUpdateProductAndAuction';
import GeneralModal from '../../../../Components/Models/GeneralModal';

const EditUserAuction = ({ auctionId, onClose }) => {
	const [formValues, setFormValues] = useState({
		title: '',
		category: '',
		buyNowPrice: '',
		initialPrize: '',
		startDate: '',
		endDate: '',
		status: '',
		description: '',
		images: [],
		images_to_remove: [],
	});
	const [is_edited, setIsEdited] = useState(false);
	const [errors, setErrors] = useState({});
	const { showError } = useError();
	const {
		data: auction,
		error,
		auctionDataLoading,
	} = useAuctionById(auctionId);

	const {
		mutate: updateAuction,
		error: updateError,
		isError,
		isSuccess,
	} = useUpdateProductAndAuction();

	useEffect(() => {
		if (auction) {
			setFormValues({
				title: auction?.product.title,
				category: auction?.product.category.name,
				buyNowPrice: auction?.product.buy_now_prize,
				initialPrize: auction?.initial_prize,
				startDate: auction?.start_time,
				endDate: auction?.end_time,
				status: auction?.is_active ? 'active' : 'inactive',
				description: auction?.product.description || '',
				images: auction?.product.images || [],
				images_to_remove: [],
			});
		}
	}, [auction]);

	const handleInputChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value });
		setIsEdited(true);
	};

	const handleAddImage = (imageObj) => {
		setFormValues({
			...formValues,
			images: [...formValues.images, imageObj],
		});
		setIsEdited(true);
	};

	const handleDeleteImage = (imageId) => {
		setFormValues((prevValues) => ({
			...prevValues,
			images: prevValues.images.filter((img) => img.id !== imageId),
			images_to_remove: [...prevValues.images_to_remove, imageId],
		}));
		setIsEdited(true);
	};

	const handleSave = () => {
		setErrors();
		const validationErrors = validateFormValues(formValues);
		if (Object.keys(validationErrors).length > 0) {
			console.log(validationErrors);
			setErrors(validationErrors);
			showError(validationErrors);
			return;
		}
		if (!is_edited) {
			showError('Update something to save');
			return;
		}

		const formData = new FormData();
		formData.append('title', formValues.title);
		formData.append('category', formValues.category);
		formData.append('buyNowPrice', formValues.buyNowPrice);
		formData.append('initialPrize', formValues.initialPrize);
		formData.append('startDate', formValues.startDate);
		formData.append('endDate', formValues.endDate);
		formData.append('status', formValues.status);
		formData.append('description', formValues.description);

		formData.append(
			'images_to_remove',
			JSON.stringify(formValues.images_to_remove)
		);

		formValues.images.forEach((img) => {
			if (img.file) {
				formData.append('images', img.file);
			}
		});

		updateAuction({ auctionId: auction.id, formData });
	};

	return (
		<div className='flex justify-center py-3'>
			<div className='xl:w-[50%] w-[70%]'>
				<EditInputs
					formValues={formValues}
					onInputChange={handleInputChange}
					errors={errors}
					auction={auction}
				/>
				<ImageManager
					images={formValues.images}
					onAddImage={handleAddImage}
					onDeleteImage={handleDeleteImage}
				/>
				<div className='mt-6 flex  space-x-2'>
					<button
						className='bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400'
						onClick={onClose}>
						Cancel
					</button>
					<button
						className='bg-buttonColour1 text-white py-2 px-4 rounded-md hover:bg-buttonColour2 focus:outline-none focus:ring-2 focus:ring-buttonColour3'
						onClick={handleSave}>
						Save
					</button>
				</div>
				<GeneralModal
					show={isSuccess}
					onClose={onClose}
					autoCloseAfter={3000}>
					<div>
						<h1 className='text-center text-xl mb-3'>
							Congratulations !!
						</h1>
					</div>
					<div>
						<p>The product has been updated succesfully</p>
					</div>
				</GeneralModal>
			</div>
		</div>
	);
};

export default EditUserAuction;
