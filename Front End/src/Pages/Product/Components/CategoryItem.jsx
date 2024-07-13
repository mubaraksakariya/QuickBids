import React from 'react';

const CategoryItem = ({ category, onClick }) => {
	return (
		<a
			href='#'
			onClick={() => onClick(category)}
			className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
			role='menuitem'>
			{category}
		</a>
	);
};

export default CategoryItem;
