import React from 'react';
import Sales from './Components/Sales';
import ActiveAuctions from './Components/ActiveAuctions';
import TotalAuctions from './Components/TotalAuctions';
import NewCustomers from './Components/NewCustomers';
import SalesChart from './Components/SalesChart';

const AdminHome = () => {
	return (
		<div className='m-5 space-y-6'>
			<div className='flex gap-4'>
				<div className='flex-grow'>
					<Sales />
				</div>
				<div className='flex-grow'>
					<ActiveAuctions />
				</div>
				<div className='flex-grow'>
					<TotalAuctions />
				</div>
			</div>
			<div className='flex gap-4'>
				<div className='flex-[9]'>
					<SalesChart />
				</div>
				<div className='flex-[3] max-h-max overflow-auto bg-sectionBgColour5 border border-cardBorderColour rounded-lg p-4'>
					<NewCustomers />
				</div>
			</div>
		</div>
	);
};

export default AdminHome;
