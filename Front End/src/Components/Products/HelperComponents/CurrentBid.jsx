const CurrentBid = ({ isLoading, error, highestBid }) => (
	<div className='flex justify-between'>
		Current Bid :{isLoading && <p>Looking...</p>}
		{error && (
			<p title={error?.response?.data.detail} className='truncate'>
				No bids!
			</p>
		)}
		{highestBid && (
			<p>
				{highestBid.message} {highestBid.amount}
			</p>
		)}
	</div>
);
export default CurrentBid;
