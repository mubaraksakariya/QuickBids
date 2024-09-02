import React from 'react';
import { UserInfo } from '../../../Product/Components/ProoductPage/UserInfo';
import useAllUsers from '../../../../CustomHooks/useAllUsers';

const NewCustomers = () => {
	const { data, error, isLoading } = useAllUsers('recent');

	if (isLoading) return <p className='text-bodyTextColour'>Loading...</p>;
	if (error) return <p className='text-errorColour'>Error fetching users</p>;

	return (
		<div className='p-5 bg-sectionBgColour5 border border-cardBorderColour rounded-lg shadow-sm mt-2'>
			<div className=''>
				<div className='mb-4'>
					<h1 className='text-lg font-semibold text-headerColour'>
						Latest Customers
					</h1>
				</div>
				<div className='space-y-3'>
					{data?.map((user) => (
						<UserInfo user={user} key={user.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default NewCustomers;
