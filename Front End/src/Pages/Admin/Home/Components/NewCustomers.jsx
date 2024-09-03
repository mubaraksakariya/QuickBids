import React from 'react';
import { UserInfo } from '../../../Product/Components/ProoductPage/UserInfo';
import useAllUsers from '../../../../CustomHooks/useAllUsers';

const NewCustomers = () => {
	const { data, error, isLoading } = useAllUsers('recent');

	if (isLoading) return <p className='text-bodyTextColour'>Loading...</p>;
	if (error) return <p className='text-errorColour'>Error fetching users</p>;

	return (
		<>
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
		</>
	);
};

export default NewCustomers;
