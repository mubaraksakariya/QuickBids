import React from 'react';
import useCategories from '../../CustomHooks/useCategories';

function CategoryNav({ setSelectedCategory }) {
	const { data, error, isLoading } = useCategories();

	const manageCategory = (e) => {
		const id = e.target.dataset.value;
		setSelectedCategory(id);
	};

	return (
		<div className=''>
			<nav className='bg-gray-100 dark:bg-gray-700'>
				<div className='max-w-screen-xl px-4 py-3 mx-auto'>
					<div className='flex justify-center'>
						<ul className='flex flex-wrap justify-center space-x-2 sm:space-x-4 md:space-x-8 text-xs sm:text-sm md:text-base'>
							{data &&
								data.map((category) => (
									<li key={category.id}>
										<span
											data-value={category.id}
											onClick={manageCategory}
											className='text-gray-900 dark:text-white hover:underline cursor-pointer font-bold transition-colors duration-200 ease-in-out hover:text-blue-600 dark:hover:text-blue-400'
											aria-current='page'>
											{category.name}
										</span>
									</li>
								))}
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default CategoryNav;
