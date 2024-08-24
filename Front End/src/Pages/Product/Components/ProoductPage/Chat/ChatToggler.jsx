import React from 'react';

export const ChatToggler = ({ toggleChat, isChatVisible, unReadCount }) => {
	return (
		<div
			className={`fixed z-50 top-1/2 right-0 transform ${
				isChatVisible ? 'translate-x-full' : 'translate-x-0'
			} transition-transform duration-500 ease-in-out`}>
			<button
				className={`bg-buttonColour1 text-white p-2 rounded-l-lg ${
					unReadCount > 0
						? 'outline outline-4 -outline-offset-1 outline-green-600'
						: ''
				}`}
				onClick={toggleChat}>
				<span className='pe-2'>
					{unReadCount > 0 ? unReadCount : ''}
				</span>
				Live Chat
			</button>
		</div>
	);
};
