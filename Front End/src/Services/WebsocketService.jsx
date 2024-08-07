class WebSocketService {
	constructor() {
		this.sockets = {};
	}

	connect(url, onMessage, onOpen, onClose, onError, key) {
		// Return if any existing socket
		if (this.sockets[key]) {
			return this.sockets[key];
		}

		let socket;

		if (url && !url.includes('undefined')) {
			// Retrieve the token from localStorage
			const accessToken = localStorage.getItem('accessToken');

			// Append token to the WebSocket URL as a query parameter
			const wsUrl = new URL(url);
			if (accessToken) {
				wsUrl.searchParams.append('token', accessToken);
			}

			socket = new WebSocket(wsUrl.toString());

			socket.onopen = (event) => {
				if (onOpen) onOpen(event);
			};

			socket.onmessage = (event) => {
				if (onMessage) onMessage(event);
			};

			socket.onclose = (event) => {
				if (onClose) onClose(event);
			};

			socket.onerror = (error) => {
				if (onError) onError(error);
			};

			// Register the new socket
			this.registerSocket(key, socket);
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
