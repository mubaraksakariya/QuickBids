import React, { useState, useEffect } from 'react';
import useCategories from '../../CustomHooks/useCategories';

function CategoryNav({ setSelectedCategory }) {
	const { data, error, isLoading } = useCategories();
	const [selected, setSelected] = useState('');
	const [isExpanded, setIsExpanded] = useState(false); // State to control category expansion
	const [isLargeScreen, setIsLargeScreen] = useState(false); // State to track if screen is large
	// Effect to detect screen size changes
	useEffect(() => {
		const handleResize = () => {
			// Check if the screen size is large (lg: and above)
			setIsLargeScreen(window.innerWidth >= 1024);
		};

		// Add event listener for resize
		window.addEventListener('resize', handleResize);

		// Initial check
		handleResize();

		// Cleanup event listener on component unmount
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Function to get the selected class
	const getSelectedClass = (category) => {
		if (category == selected) {
			return 'bg-cardBgColour text-cardTextColour rounded-full shadow-md';
		} else {
			return 'text-linkColour hover:bg-sectionBgColour2 rounded-full';
		}
	};

	// Manage category selection
	const manageCategory = (e) => {
		const id = e.target.dataset.value;
		setSelected(id);
		setSelectedCategory(id);
	};

	// Toggle expansion of categories on small screens
	const toggleExpansion = () => {
		setIsExpanded((prev) => !prev);
	};

	// Determine categories to show based on screen size and expansion state
	const categoriesToShow =
		isLargeScreen || isExpanded ? data : data?.slice(0, 3);

	return (
		<div className='w-full'>
			<nav className='bg-gray-100 dark:bg-gray-700'>
				<div className='max-w-screen-xl px-4 py-3 mx-auto'>
					<div className='flex justify-center'>
						<ul className='flex flex-wrap gap-y-5 justify-center space-x-2 sm:space-x-4 md:space-x-8 text-xs sm:text-sm md:text-base'>
							<li>
								<span
									data-value=''
									onClick={manageCategory}
									className={`cursor-pointer font-bold transition-all duration-300 ease-in-out px-4 py-2 ${getSelectedClass(
										''
									)}`}
									aria-current='page'>
									All
								</span>
							</li>
							{categoriesToShow &&
								categoriesToShow.map((category) => (
									<li key={category.id}>
										<span
											data-value={category.id}
											onClick={manageCategory}
											className={`cursor-pointer font-bold transition-all duration-300 ease-in-out px-4 py-2 ${getSelectedClass(
												category.id
											)}`}
											aria-current='page'>
											{category.name}
										</span>
									</li>
								))}
						</ul>
					</div>
					{/* Show "View All" button only on small screens if there are more than 3 categories */}
					{!isLargeScreen && data?.length > 3 && (
						<div className='flex justify-center mt-4 lg:hidden'>
							<button
								onClick={toggleExpansion}
								className='text-linkColour hover:text-linkHoverColour text-xs'>
								{isExpanded ? 'View Less' : 'View All'}
							</button>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
}

export default CategoryNav;
