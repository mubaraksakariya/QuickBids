import React, { useState, useRef, useEffect } from 'react';
import CategoryItem from './CategoryItem'; // Adjust the path as needed

function CategoryInput({ setCategory, category, error }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [newCategory, setNewCategory] = useState(null);
	const dropdownRef = useRef(null);

	const categories = [
		'category1',
		'category2',
		'category3',
		'category4',
		'category5',
		'category6',
	];

	const handleCategoryClick = (category) => {
		setSelectedCategory(category);
		setNewCategory(null);
		setIsDropdownOpen(false);
	};
	const manageNewCategory = (e) => {
		setNewCategory(e.target.value);
		setSelectedCategory(null);
	};
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};
	useEffect(() => {
		if (selectedCategory) setCategory(selectedCategory);
		if (newCategory) setCategory(newCategory);
	}, [selectedCategory, newCategory]);

	const handleClickOutside = (event) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target)
		) {
			setIsDropdownOpen(false);
		}
	};

	useEffect(() => {
		if (isDropdownOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDropdownOpen]);

	return (
		<div className='pb-3 w-full relative'>
			<div
				className='relative inline-block text-left pb-4 w-full'
				ref={dropdownRef}>
				<div>
					<label
						htmlFor='category'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
						Select a category
					</label>
					<button
						type='button'
						className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						id='options-menu'
						aria-expanded={isDropdownOpen}
						aria-haspopup='true'
						onClick={toggleDropdown}>
						{selectedCategory ? selectedCategory : 'Categories'}
						{isDropdownOpen ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
								className='size-5'>
								<path
									fillRule='evenodd'
									d='M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z'
									clipRule='evenodd'
								/>
							</svg>
						) : (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
								className='size-5'>
								<path
									fillRule='evenodd'
									d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
									clipRule='evenodd'
								/>
							</svg>
						)}
					</button>
				</div>

				{isDropdownOpen && (
					<div
						className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
						role='menu'
						aria-orientation='vertical'
						aria-labelledby='options-menu'>
						<div className='py-1' role='none'>
							{categories.map((category) => (
								<CategoryItem
									key={category}
									category={category}
									onClick={handleCategoryClick}
								/>
							))}
						</div>
					</div>
				)}
			</div>
			<div>
				<div>
					<label
						htmlFor='category'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center'>
						Or add one
					</label>
					<input
						value={newCategory ? newCategory : ''}
						onChange={manageNewCategory}
						type='text'
						id='category'
						className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						placeholder='New Category'
						required={category == null}
					/>
				</div>
			</div>
			<span className=' absolute text-errorColour text-sm'>{error}</span>
		</div>
	);
}

export default CategoryInput;
