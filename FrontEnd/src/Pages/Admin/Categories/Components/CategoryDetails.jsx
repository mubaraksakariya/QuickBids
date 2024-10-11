import React from 'react';
import useCategoryExtras from '../../../../CustomHooks/useCategoryExtras';

const CategoryDetails = ({ category }) => {
	const {
		data,
		error: categoryError,
		isLoading: categoryLoading,
	} = useCategoryExtras(category?.id);
	console.log(data);

	return (
		<div className='bg-sectionBgColour5 p-6 rounded-lg shadow-lg'>
			<h1 className='text-2xl font-semibold text-headerColour mb-4'>
				Category Details
			</h1>
			<div className='mb-4'>
				<h2 className='text-lg font-medium text-bodyTextColour'>
					Category Name: {category?.name || 'Unnamed Category'}
				</h2>
				<p className='text-sm text-bodyTextColour cursor-pointer'>
					Created by:{' '}
					{category?.created_by.email || 'No creater info provided.'}
				</p>
				<p className='text-sm text-bodyTextColour'>
					Description:{' '}
					{category?.description || 'No description provided.'}
				</p>
			</div>
			<div className='mb-4'>
				<h2 className='text-lg font-medium text-bodyTextColour'>
					Total Products:{' '}
					{categoryLoading
						? 'Loading...'
						: categoryError
						? 'Error loading data'
						: data?.total_products || 0}
				</h2>
				<p className='text-sm text-bodyTextColour'>
					Active Products:{' '}
					{categoryLoading
						? 'Loading...'
						: categoryError
						? 'Error'
						: data?.total_active_products || 0}
				</p>
				<p className='text-sm text-bodyTextColour'>
					Inactive Products:{' '}
					{categoryLoading
						? 'Loading...'
						: categoryError
						? 'Error'
						: data?.total_inactive_products || 0}
				</p>
			</div>
			<div className='mb-4'>
				<h2 className='text-lg font-medium text-bodyTextColour'>
					Sold Items:{' '}
					{categoryLoading
						? 'Loading...'
						: categoryError
						? 'Error'
						: data?.total_sold_items || 0}
				</h2>
				<p className='text-sm text-bodyTextColour'>
					Total Revenue:{' '}
					{categoryLoading
						? 'Loading...'
						: categoryError
						? 'Error'
						: data?.total_revenue
						? `${data.total_revenue.toLocaleString()}`
						: 'N/A'}
				</p>
			</div>
			<div className='mb-4'>
				<h2 className='text-lg font-medium text-bodyTextColour'>
					Approval Status:{' '}
					{category?.is_approved ? 'Approved' : 'Not Approved'}
				</h2>
				<p className='text-sm text-bodyTextColour'>
					Category Created:{' '}
					{new Date(category?.created_at).toLocaleDateString()}
				</p>
				<p className='text-sm text-bodyTextColour'>
					Last Updated:{' '}
					{new Date(category?.updated_at).toLocaleDateString()}
				</p>
			</div>
		</div>
	);
};

export default CategoryDetails;
