import { useSelector } from 'react-redux';
import useWebSocket from './useWebSocket';

const useProductWebSocket = (
	auctionId,
	setHighestBid,
	setProxybid,
	refetch,
	setLiveChatMessages
) => {
	const socketUrl = `auction/${auctionId}/`;
	const socketKey = `auction-${auctionId}`;
	const user = useSelector((state) => state.auth.user);

	const handleMessage = (event) => {
		try {
			const message = JSON.parse(event.data);
			const data = message.data;
			const messageType = data?.message_type;

			switch (messageType) {
				case 'bid_update':
					if (data?.bid) {
						setHighestBid(data.bid);
						setTimeout(() => {
							refetch('bid_update');
						}, 2000);
					}
					break;

				case 'proxy_bid_update':
					if (setProxybid && data?.bid) {
						setProxybid(data.bid);
					}
					break;

				case 'auction_chat':
					if (data) {
						console.log(data);
						setLiveChatMessages((prev) => [...prev, data]);
					}
					break;

				default:
					console.warn(`Unhandled message type: ${messageType}`);
					break;
			}
		} catch (error) {
			console.error('Error handling WebSocket message:', error);
		}
	};

	const onOpen = () => {
		console.log('WebSocket connection opened.');
	};

	const onClose = () => {
		console.log('WebSocket connection closed.');
	};

	const { sendMessage } = useWebSocket(
		socketKey,
		socketUrl,
		handleMessage,
		onOpen,
		onClose
	);

	const manageSendMessage = (message) => {
		console.log('Sending message:', message);
		const data = {
			type: 'auction_chat',
			data: {
				content: message,
				sender: user,
				message_type: 'auction_chat',
				time: new Date().toISOString(),
			},
			recipient_group: `auction_${auctionId}`,
		};
		sendMessage(data);
	};

	return { manageSendMessage };
};

export default useProductWebSocket;
