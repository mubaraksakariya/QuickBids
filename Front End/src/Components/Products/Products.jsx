import React from 'react';
import Card from './Card';
import useApi from '../../Context/AxiosContext';
import { useQuery } from '@tanstack/react-query';

function Products({ searchString, selectedCategory }) {
	const api = useApi();

	const fetchData = async ({ queryKey }) => {
		const [, searchString, selectedCategory] = queryKey;
		const params = {};
		if (searchString) {
			params.search = searchString;
		}
		if (selectedCategory) {
			params.category = selectedCategory;
		}
		const response = await api.get('api/products/', { params });
		return response.data;
	};

	const { data, error, isLoading } = useQuery({
		queryKey: ['products', searchString, selectedCategory],
		queryFn: fetchData,
	});

	return (
		<div className='p-2 grid gap-1 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
			{isLoading && (
				<div className=' text-center text-errorColour'>loading..</div>
			)}
			{error && (
				<div className='text-center text-errorColour'>
					Error loading products
				</div>
			)}
			{data?.map((item) => (
				<div className='flex justify-center' key={item.id}>
					<Card product={item} />
				</div>
			))}
		</div>
	);
}

export default Products;
