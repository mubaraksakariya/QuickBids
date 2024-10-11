import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleSendMessage = (e) => {
		e.preventDefault();
		if (inputValue.trim() !== '') {
			onSend(inputValue);
			setInputValue('');
		}
	};

	return (
		<form onSubmit={handleSendMessage}>
			<div className='flex items-center px-3 py-2 rounded-lg bg-sectionBgColour5'>
				{/* Add emoji button */}
				<button
					type='button'
					className='p-2 text-linkColour rounded-lg cursor-pointer hover:text-linkHoverColour hover:bg-sectionBgColour2'>
					<svg
						className='w-5 h-5'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 20 20'>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z'
						/>
					</svg>
					<span className='sr-only'>Add emoji</span>
				</button>
				{/* Text input area */}
				<textarea
					id='chat'
					rows='1'
					className='block mx-4 p-2.5 w-full text-sm text-bodyTextColour bg-white rounded-lg border border-cardBorderColour focus:ring-buttonColour1 focus:border-buttonColour1 placeholder-bodyTextColour'
					placeholder='Type your message...'
					value={inputValue}
					onChange={handleInputChange}
					onKeyPress={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							handleSendMessage(e);
						}
					}}></textarea>
				{/* Send button */}
				<button
					type='submit'
					className='inline-flex justify-center p-2 text-buttonColour1 rounded-full cursor-pointer hover:bg-sectionBgColour3'>
					<svg
						className='w-5 h-5 rotate-90 rtl:-rotate-90'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 18 20'>
						<path d='m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z' />
					</svg>
					<span className='sr-only'>Send message</span>
				</button>
			</div>
		</form>
	);
};

export default ChatInput;
