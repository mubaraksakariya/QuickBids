import React from 'react';
import useCategories from '../../CustomHooks/useCategories';

function CategoryNav({ setSelectedCategory }) {
	const { data, error, isLoading } = useCategories();
	const manageCategory = (e) => {
		const id = e.target.dataset.value;
		// console.log(id);
		setSelectedCategory(id);
	};
	return (
		<div className=''>
			<nav className=' bg-themeBgColour dark:bg-gray-700'>
				<div className='max-w-screen-xl px-4 py-3 mx-auto'>
					<div className='flex justify-center'>
						<ul className='flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm'>
							{data &&
								data.map((category) => {
									return (
										<li key={category.id}>
											<span
												data-value={category.id}
												onClick={manageCategory}
												className='text-gray-900 dark:text-white hover:underline cursor-pointer font-bold'
												aria-current='page'>
												{category.name}
											</span>
										</li>
									);
								})}
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default CategoryNav;
