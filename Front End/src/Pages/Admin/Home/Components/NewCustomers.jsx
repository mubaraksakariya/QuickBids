import React from 'react';
import { UserInfo } from '../../../Product/Components/ProoductPage/UserInfo';
import useRecentCustomers from '../../../../CustomHooks/useRecentCustomers';

const NewCustomers = () => {
	const { data, isLoading, isError } = useRecentCustomers();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading latest customers.</div>;
	}
	if (data) console.log(data);

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
