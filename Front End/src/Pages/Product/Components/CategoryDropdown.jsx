import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryDropdown = ({ categories, handleCategoryClick }) => {
	return (
		<div
			className='origin-top-right absolute z-50 left-1 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
			role='menu'
			aria-orientation='vertical'
			aria-labelledby='options-menu'>
			<div className='py-1' role='none'>
				{categories.map((category) => (
					<CategoryItem
						key={category.id}
						category={category.name}
						onClick={() => handleCategoryClick(category)}
					/>
				))}
			</div>
		</div>
	);
};

export default CategoryDropdown;
