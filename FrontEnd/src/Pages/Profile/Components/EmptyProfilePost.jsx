import React from 'react';
import ThemeButtons from '../../../Components/Buttons/ThemeButton';
import { useNavigate } from 'react-router-dom';

function EmptyProfilePost() {
	const navigate = useNavigate();

	return (
		<div className='relative flex flex-col justify-center items-center overflow-hidden m-8 rounded-xl'>
			<img
				className='w-full h-full object-cover opacity-75 '
				src='/emtypage.jpeg'
				alt=''
			/>
			<div className='absolute flex flex-col justify-center items-center gap-3'>
				<h1 className=''>You haven't listed anything</h1>
				<ThemeButtons
					text='Start selling'
					style={3}
					onclick={() => navigate('/product/create')}
					className={'p-3'}
				/>
			</div>
		</div>
	);
}

export default EmptyProfilePost;
