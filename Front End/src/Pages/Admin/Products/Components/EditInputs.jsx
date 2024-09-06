import React, { useEffect } from 'react';
import useCategories from '../../../../CustomHooks/useCategories';
import useHighestBid from '../../../../CustomHooks/useHighestBid';
import { formatUTCDateTime } from '../../../Product/Utils/helpers';

const EditInputs = ({ formValues, onInputChange, errors, auction }) => {
	const { data: categories } = useCategories();
	const { data: highestBid } = useHighestBid(auction?.id);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === 'endDate') {
			onInputChange(name, new Date(value).toISOString());
			return;
		}
		onInputChange(name, value);
	};

	return (
		<>
			<h2 className='text-2xl font-semibold text-headerColour mb-4'>
				Edit Product
			</h2>
			<div className='space-y-4'>
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						Title
					</label>
					<input
						type='text'
						name='title'
						value={formValues?.title}
						onChange={handleInputChange}
						className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-white text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						Category
					</label>
					<select
						name='category'
						value={formValues.category}
						onChange={handleInputChange}
						className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-white text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'>
						<option value=''>Select Category</option>
						{categories?.map((category) => (
							<option key={category.id} value={category.name}>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						Buy Now Price
					</label>
					<input
						min={
							auction?.initial_prize > highestBid?.amount
								? auction.initial_prize
								: highestBid?.amount || 0
						}
						type='number'
						name='buyNowPrice'
						value={formValues.buyNowPrice}
						onChange={handleInputChange}
						className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-white text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						Description
					</label>
					<textarea
						name='description'
						value={formValues.description}
						onChange={handleInputChange}
						className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-white text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'
						rows='3'
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-bodyTextColour'>
						Auction Status
					</label>
					<select
						name='status'
						value={formValues.status}
						onChange={handleInputChange}
						className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-white text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'>
						<option value='active'>Active</option>
						<option value='inactive'>Inactive</option>
					</select>
				</div>

				{/* Conditionally render the End Date input when the status is active */}
				{formValues.status === 'active' && (
					<div>
						<label className='block text-sm font-medium text-bodyTextColour'>
							End Date and Time
						</label>
						<input
							type='datetime-local'
							name='endDate'
							value={formatUTCDateTime(
								new Date(formValues.endDate)
							)}
							onChange={handleInputChange}
							className='mt-1 block w-full border border-cardBorderColour rounded-md p-2 bg-white text-bodyTextColour focus:outline-none focus:ring-2 focus:ring-buttonColour1'
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default EditInputs;
