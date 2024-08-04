class WebSocketService {
	constructor() {
		this.sockets = {};
	}

	connect(url, onMessage, onOpen, onClose, onError, key) {
		// return if any existing socket
		if (this.sockets[key]) {
			// console.log('WebSocket already connected for URL:', url);
			return this.sockets[key];
		}
		let socket;
		if (url && !url.includes('undefined')) {
			socket = new WebSocket(url);

			socket.onopen = (event) => {
				// console.log('WebSocket is open now.');
				if (onOpen) onOpen(event);
			};

			socket.onmessage = (event) => {
				// console.log('WebSocket message received:', event);
				if (onMessage) onMessage(event);
			};

			socket.onclose = (event) => {
				// console.log('WebSocket is closed now.');
				if (onClose) onClose(event);
			};

			socket.onerror = (error) => {
				// console.error('WebSocket error observed:', error);
				if (onError) onError(error);
			};
		}
		return socket;
	}

	registerSocket(key, socket) {
		this.sockets[key] = socket;
	}

	getSocket(key) {
		return this.sockets[key];
	}

	closeSocket(key) {
		if (this.sockets[key]) {
			const socket = this.sockets[key];
			if (
				socket.readyState !== WebSocket.CLOSED &&
				socket.readyState !== WebSocket.CONNECTING
			) {
				socket.close();
				delete this.sockets[key];
			}
		}
	}
}

const websocketService = new WebSocketService();
export default websocketService;
