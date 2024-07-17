import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useApi from '../../Context/AxiosContext';

function CategoryNav({ setSelectedCategory }) {
	const api = useApi();
	const fetchData = async () => {
		const response = await api.get('api/categories/');
		return response.data;
	};
	const { data, error, isLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: fetchData,
	});
	const manageCategory = (e) => {
		const id = e.target.dataset.value;
		// console.log(id);
		setSelectedCategory(id);
	};
	return (
		<div className=' '>
			<nav className='bg-gray-50 dark:bg-gray-700'>
				<div className='max-w-screen-xl px-4 py-3 mx-auto'>
					<div className='flex items-center'>
						<ul className='flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm'>
							{data &&
								data.map((category) => {
									return (
										<li key={category.id}>
											<span
												data-value={category.id}
												onClick={manageCategory}
												className='text-gray-900 dark:text-white hover:underline cursor-pointer'
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
