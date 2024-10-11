import React from 'react';

function NoProduct() {
	return (
		<div className=' w-full min-h-[20rem] flex justify-center items-center'>
			<div className=' flex-grow'>
				<div className=''>
					<h1 className='text-3xl text-center'>
						No products available at the moment
					</h1>
				</div>
				<div className=''>
					<p className=' text-center'>Come back later</p>
				</div>
			</div>
		</div>
	);
}

export default NoProduct;
