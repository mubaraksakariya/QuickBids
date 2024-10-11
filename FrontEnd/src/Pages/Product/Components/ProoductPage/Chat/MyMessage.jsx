import React from 'react';
import LocalTimeDisplay from '../../../../../Components/Utilities/LocalTimeDisplay';

const MyMessage = ({ message }) => {
	const content = message?.content;
	const time = message?.time;
	const sender = message?.sender;
	return (
		<div className='flex justify-end mb-2'>
			<div className='flex items-start gap-2.5 max-w-xs w-full'>
				<div className='flex flex-col w-full p-4 border border-cardBorderColour bg-sectionBgColour9 rounded-s-xl rounded-se-xl text-right'>
					<div className='flex items-center justify-end space-x-2 rtl:space-x-reverse'>
						<span className='text-sm font-semibold text-headerColour'>
							Me
						</span>
					</div>
					<p className='text-sm font-normal py-2.5 text-bodyTextColour'>
						{content}
					</p>
					<span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
						<LocalTimeDisplay timestamp={time} />
					</span>
				</div>
				<img
					className='w-8 h-8 rounded-full'
					src={sender.profile_picture}
					alt='user'
				/>
			</div>
		</div>
	);
};

export default MyMessage;
