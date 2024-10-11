import React from 'react';
import MyMessage from './MyMessage';
import OtherMessage from './OtherMessage';
import { useSelector } from 'react-redux';

const ChatMessages = ({ messages }) => {
	const currentUser = useSelector((state) => state.auth.user);

	return (
		<div className='flex-grow overflow-y-auto mb-4'>
			{messages.map((message, index) =>
				message.sender?.email === currentUser?.email ? (
					<MyMessage key={index} message={message} />
				) : (
					<OtherMessage key={index} message={message} />
				)
			)}
		</div>
	);
};

export default ChatMessages;
