import React, { useEffect, useState } from 'react';
import GeneralModal from '../../../../../Components/Models/GeneralModal';
import { useError } from '../../../../../Context/ErrorContext';
import useUpdateWithdrawalRequest from './useUpdateWithdrawalRequest';
import validateWithdrawalForm from './validateWithdrawalForm';
import WithdrawalRequestDetails from './WithdrawalRequestDetails';
import EditWithdrawalForm from './EditWithdrawalForm';

const EditWithdrawalRequestModal = ({ request, onClose }) => {
	const [isEdited, setIsEdited] = useState(false);
	const [errors, setErrors] = useState({});
	const { showError } = useError();

	const [formValues, setFormValues] = useState({
		status: request?.status || 'PENDING',
		failure_reason: request?.failure_reason || '',
	});

	const {
		mutate: updateWithdrawalRequest,
		isSuccess,
		error,
	} = useUpdateWithdrawalRequest();

	const handleSave = () => {
		setErrors({});
		const validationErrors = validateWithdrawalForm(formValues);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}
		if (!isEdited) {
			showError('Update something to save');
			return;
		}
		console.log(formValues.status);

		const formData = new FormData();
		formData.append('status', formValues.status);
		if (formValues.failure_reason)
			formData.append('failure_reason', formValues.failure_reason || '');

		updateWithdrawalRequest({ requestId: request.id, formData });
	};

	const handleInputChange = (name, value) => {
		console.log(name, value);

		setFormValues({ ...formValues, [name]: value });
		setIsEdited(true);
	};
	useEffect(() => {
		if (error) showError(error.message);
	}, [error]);

	return (
		<div className='fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='flex lg:flex-row flex-col justify-center bg-sectionBgColour2 rounded-lg shadow-lg overflow-hidden min-w-[60%] lg:max-w-[60%]'>
				{/* Left Section: Request Details */}
				<WithdrawalRequestDetails request={request} />

				{/* Right Section: Edit Form */}
				<EditWithdrawalForm
					formValues={formValues}
					handleInputChange={handleInputChange}
					errors={errors}
					handleSave={handleSave}
					onClose={onClose}
				/>
			</div>

			{/* Success Modal */}
			<GeneralModal
				show={isSuccess}
				onClose={onClose}
				autoCloseAfter={3000}>
				<div>
					<h1 className='text-center text-xl mb-3'>Success!</h1>
				</div>
				<div>
					<p>The withdrawal request has been updated successfully.</p>
				</div>
			</GeneralModal>
		</div>
	);
};

export default EditWithdrawalRequestModal;
