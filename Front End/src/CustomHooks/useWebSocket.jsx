import { useCallback, useEffect } from 'react';
import websocketService from '../Services/WebsocketService';
import { useSelector } from 'react-redux';

const useWebSocket = (key, url, onMessage, onOpen, onClose, onError) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		let socket;

		if (isAuthenticated && url) {
			socket = websocketService.connect(
				url,
				onMessage,
				onOpen,
				onClose,
				onError,
				key
			);
		} else {
			console.warn(
				'WebSocket connection not established: Missing URL or user not authenticated.'
			);
		}

		// Cleanup on unmount or when dependencies change
		return () => {
			if (socket) {
				websocketService.closeSocket(key);
			}
		};
	}, [key, url, isAuthenticated, onMessage, onOpen, onClose, onError]);

	// Function to send a message through the WebSocket
	const sendMessage = useCallback(
		(message) => {
			if (isAuthenticated) {
				websocketService.sendMessage(key, message);
			} else {
				console.warn('Message not sent: User is not authenticated.');
			}
		},
		[key, isAuthenticated]
	);

	return { sendMessage };
};

export default useWebSocket;
