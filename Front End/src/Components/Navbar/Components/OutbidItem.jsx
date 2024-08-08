import React, { useEffect } from 'react';
import LocalTimeDisplay from '../../Utilities/LocalTimeDisplay';
import useMarkNotificationAsRead from '../../../CustomHooks/useMarkNotificationAsRead';
import { useDispatch } from 'react-redux';
import { markNotificationRead } from '../../../Store/notificationSlice';
import useAuctionById from '../../../CustomHooks/useAuctionById';
function OutbidItem({ notification }) {
	const { mutate: markAsRead } = useMarkNotificationAsRead();
	const dispatch = useDispatch();

	const { data, isLoading, isError, error } = useAuctionById(
		notification.auction
	);

	const manageMarkAsRead = () => {
		if (!notification.is_read) {
			markAsRead(notification.id);
			dispatch(markNotificationRead(notification.id));
		}
	};
	const getStyle = () => {
		if (!notification.is_read) return 'bg-green-100';
	};
	useEffect(() => {
		return () => {
			manageMarkAsRead();
		};
	}, [notification]);

	return (
		<div
			className={`p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100  ${getStyle()}`}
			onClick={() => console.log(data)}>
			<div className='text-sm font-medium text-gray-900'>
				{notification.message}
			</div>
			<LocalTimeDisplay
				timestamp={notification.created_at}
				formatOptions={{
					weekday: 'long',
					hour: 'numeric',
					minute: 'numeric',
				}}
			/>
		</div>
	);
}

export default OutbidItem;
