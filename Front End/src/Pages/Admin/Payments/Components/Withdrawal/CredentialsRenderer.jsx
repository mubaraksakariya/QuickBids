import React from 'react';

// CredentialsRenderer component for handling different credential types
const CredentialsRenderer = ({ detail }) => {
	// Helper function to truncate text
	const truncateText = (text, maxLength) =>
		text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
	if (detail.upi_details) {
		return (
			<span title={detail.upi_details.upi_id}>
				<strong>UPI ID:</strong> {detail.upi_details.upi_id || 'N/A'}
			</span>
		);
	} else if (detail.account_details) {
		return (
			<span title={detail.account_details.account_number}>
				<strong>Account:</strong>{' '}
				{truncateText(detail.account_details.account_number, 15)}
				<br />
				<strong>Bank:</strong>{' '}
				{detail.account_details?.bank_name || 'N/A'}
				<br />
				<strong>IFSC:</strong>{' '}
				{detail.account_details?.ifsc_code || 'N/A'}
			</span>
		);
	} else if (detail.card_details) {
		return (
			<span title={detail.card_details.card_number}>
				<strong>Card:</strong> {detail.card_details?.card_number}
				<br />
				<strong>Card Holder:</strong>{' '}
				{detail.card_details?.name_on_card || 'N/A'}
				<br />
				<strong>Expiry:</strong>{' '}
				{detail.card_details?.valid_through || 'N/A'}
			</span>
		);
	}
	return 'N/A';
};

export default CredentialsRenderer;
