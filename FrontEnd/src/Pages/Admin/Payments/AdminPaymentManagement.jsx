import React, { useState } from 'react';
import SubNav from './Components/SubNav';
import WithdrawalRequests from './Components/Withdrawal/WithdrawalRequests';
import PayamentCompleted from './Components/Completed/PayamentCompleted';
import PaymentPending from './Components/Pending/PaymentPending';
import DashBoard from '../DashBoard';

function AdminPaymentManagement() {
	return (
		<DashBoard>
			<WithdrawalRequests />
		</DashBoard>
	);
}

export default AdminPaymentManagement;
