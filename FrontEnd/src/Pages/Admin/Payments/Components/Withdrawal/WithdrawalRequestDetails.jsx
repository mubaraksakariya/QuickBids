import React from 'react';
import CredentialsRenderer from './CredentialsRenderer';

const WithdrawalRequestDetails = ({ request }) => {
	return (
		<div className='lg:flex-1 m-6 p-6 bg-sectionBgColour5  rounded-lg shadow-sm'>
			<h2 className='text-2xl font-semibold mb-4 text-headerColour'>
				Request Details
			</h2>
			<div className='mb-4 text-bodyTextColour'>
				<p className='mb-2'>
					<strong className='text-headerColour'>User:</strong>{' '}
					{request?.user?.first_name || 'N/A'} <br />
					{request?.user?.email || 'N/A'}
				</p>
				<p className='mb-2'>
					<strong className='text-headerColour'>
						Requested Amount:
					</strong>{' '}
					{request?.amount || 'N/A'}
				</p>
				<p className='mb-2'>
					<strong className='text-headerColour'>Requested At:</strong>{' '}
					{request?.requested_at
						? new Date(request?.requested_at).toLocaleDateString()
						: 'N/A'}
				</p>
			</div>

			<div className='mb-4 text-bodyTextColour'>
				<p className='mb-2'>
					<strong className='text-headerColour'>
						Payment Method:
					</strong>{' '}
					{request?.type || 'N/A'}
				</p>
				<p className='mb-2'>
					<strong className='text-headerColour'>Status:</strong>{' '}
					<span
						className={`${
							request?.status === 'PENDING'
								? 'text-yellow-600'
								: request?.status === 'APPROVED'
								? 'text-button2Colour1'
								: request?.status === 'REJECTED'
								? 'text-red-600'
								: 'text-green-600'
						}`}>
						{request?.status || 'N/A'}
					</span>
				</p>
				<p className='mb-2'>
					<strong className='text-headerColour'>Processed At:</strong>{' '}
					{request?.processed_at
						? new Date(request?.processed_at).toLocaleDateString()
						: 'Not Processed'}
				</p>
			</div>

			<div className='mb-4 text-bodyTextColour'>
				<h3 className='text-lg font-semibold text-headerColour mb-2'>
					Payment Details
				</h3>
				<CredentialsRenderer detail={request} />
			</div>
		</div>
	);
};

export default WithdrawalRequestDetails;
