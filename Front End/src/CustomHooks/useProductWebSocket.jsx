import useWebSocket from './useWebSocket';

const useProductWebSocket = (
	auctionId,
	refetch,
	setHighestBid,
	setProxybid = null
) => {
	const socketUrl = `auction/${auctionId}/`;
	const socketKey = `auction-${auctionId}`;

	const handleMessage = (event) => {
		const message = JSON.parse(event.data);
		const data = message.data;
		const message_type = data.message_type;
		// console.log(data);

		if (message_type === 'bid_update' && data) {
			const new_bid = data.bid;
			setHighestBid(new_bid);
			setTimeout(() => {
				refetch('bid_update');
			}, 2000);
		}
		if (message_type === 'proxy_bid_update' && data) {
			const new_proxy_bid = data.bid;
			setProxybid && setProxybid(new_proxy_bid);
			// setTimeout(() => {
			// 	refetch('proxy_bid_update');
			// }, 2000);
		}
	};

	useWebSocket(socketKey, socketUrl, handleMessage);
};

export default useProductWebSocket;
