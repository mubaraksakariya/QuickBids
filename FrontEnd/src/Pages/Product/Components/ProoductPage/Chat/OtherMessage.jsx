import React from 'react';
import LocalTimeDisplay from '../../../../../Components/Utilities/LocalTimeDisplay';

const OtherMessage = ({ message }) => {
	const content = message?.content;
	const time = message?.time;
	const sender = message?.sender;
	return (
		<div className='flex justify-start mb-2'>
			<div className='flex items-start gap-2.5 max-w-xs w-full'>
				<img
					className='w-8 h-8 rounded-full'
					src={sender.profile_picture}
					alt='user'
				/>
				<div className='flex flex-col w-full p-4 border border-cardBorderColour bg-sectionBgColour8 rounded-e-xl rounded-es-xl'>
					<div className='flex items-center space-x-2 rtl:space-x-reverse'>
						<span className='text-sm font-semibold text-headerColour'>
							{sender.first_name}
						</span>
					</div>
					<p className='text-sm font-normal py-2.5 text-bodyTextColour'>
						{content}
					</p>
					<span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
						<LocalTimeDisplay timestamp={time} />
					</span>
				</div>
				{/* <button
					className='inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600'
					type='button'>
					<svg
						className='w-4 h-4 text-gray-500 dark:text-gray-400'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 4 15'>
						<path d='M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z' />
					</svg>
				</button> */}
			</div>
		</div>
	);
};

export default OtherMessage;
