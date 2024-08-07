import { useEffect } from 'react';
import websocketService from '../Services/WebsocketService';
import { useSelector } from 'react-redux';

const useWebSocket = (key, url, onMessage, onOpen, onClose, onError) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	useEffect(() => {
		if (isAuthenticated) {
			const socket = websocketService.connect(
				url,
				onMessage,
				onOpen,
				onClose,
				onError,
				key
			);
			websocketService.registerSocket(key, socket);
		}

		return () => {
			websocketService.closeSocket(key);
		};
	}, [key, url, onMessage, onOpen, onClose, onError, isAuthenticated]);
};

export default useWebSocket;
