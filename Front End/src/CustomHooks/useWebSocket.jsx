import { useEffect } from 'react';
import websocketService from '../Services/WebsocketService';

const useWebSocket = (key, url, onMessage, onOpen, onClose, onError) => {
	useEffect(() => {
		const socket = websocketService.connect(
			url,
			onMessage,
			onOpen,
			onClose,
			onError,
			key
		);
		websocketService.registerSocket(key, socket);

		return () => {
			websocketService.closeSocket(key);
		};
	}, [key, url, onMessage, onOpen, onClose, onError]);
};

export default useWebSocket;
