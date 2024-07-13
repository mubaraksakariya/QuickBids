import React, { useEffect, useState } from 'react';
import Nav from './Components/Nav';
import CategoryInput from './Components/CategoryInput';
import ProductDetails from './Components/ProductDetails';
import PriceInput from './Components/PriceInput';

function CreateProduct() {
	const [category, setCategory] = useState(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [initialPrize, setInitialPrize] = useState(0);
	const [buyNowPrize, setBuyNowPrize] = useState(0);

	useEffect(() => {
		console.log(title);
		console.log(description);
	}, [description, title]);

	return (
		<div className='min-h-[100dvh] w-full lg:w-[90%]'>
			<Nav />
			<h1 className=' text-center'>Create Your Ad</h1>
			<div className='flex flex-col justify-center items-center border'>
				<CategoryInput setCategory={setCategory} />
				<ProductDetails
					title={title}
					setTitle={setTitle}
					description={description}
					setDescription={setDescription}
				/>
				<PriceInput
					initialPrize={initialPrize}
					setInitialPrize={setInitialPrize}
					buyNowPrize={buyNowPrize}
					setBuyNowPrize={setBuyNowPrize}
				/>
			</div>
		</div>
	);
}

export default CreateProduct;
