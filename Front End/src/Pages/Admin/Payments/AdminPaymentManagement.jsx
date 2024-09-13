import React, { useState } from 'react';
import SubNav from './Components/SubNav';
import WithdrawalRequests from './Components/Withdrawal/WithdrawalRequests';
import PayamentCompleted from './Components/Completed/PayamentCompleted';
import PaymentPending from './Components/Pending/PaymentPending';

function AdminPaymentManagement() {
	const [tab, setTab] = useState('withdrawalReaquests');
	const getTab = () => {
		switch (tab) {
			case 'Withdrawal':
				return <WithdrawalRequests />;
				break;
			case 'completed':
				return <PayamentCompleted />;
				break;
			case 'pending':
				return <PaymentPending />;
				break;
			default:
				return <WithdrawalRequests />;
		}
	};
	return (
		<div>
			<SubNav tab={tab} setTab={setTab} />
			{getTab()}
		</div>
	);
}

export default AdminPaymentManagement;
