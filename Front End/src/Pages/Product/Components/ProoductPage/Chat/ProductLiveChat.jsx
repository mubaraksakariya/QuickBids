import React from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

export const ProductLiveChat = ({
	isChatVisible,
	toggleChat,
	sendMessage,
	messages,
}) => {
	return (
		<div
			className={`fixed z-50 bottom-0 right-0 h-[50%] w-80 md:w-96 bg-sectionBgColour10 shadow-lg transform ${
				isChatVisible ? 'translate-x-0' : 'translate-x-full'
			} transition-transform duration-300 ease-in-out rounded-t-lg`}>
			<div className='flex flex-col h-full p-4'>
				<div className='flex items-center justify-between mb-4'>
					<h2 className='text-xl font-bold text-headerColour'>
						Live Chat
					</h2>
					<button
						className='text-headerColour hover:text-buttonColour1 transition duration-200'
						onClick={toggleChat}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='currentColor'
							className='w-6 h-6'>
							<path
								fillRule='evenodd'
								d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z'
								clipRule='evenodd'
							/>
						</svg>
					</button>
				</div>
				<div className='flex-grow overflow-y-auto bg-sectionBgColour9 rounded-lg p-2 shadow-inner'>
					<ChatMessages messages={messages} />
				</div>
				<div className='mt-4'>
					<ChatInput onSend={sendMessage} />
				</div>
			</div>
		</div>
	);
};