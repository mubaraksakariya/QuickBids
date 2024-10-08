import React, { createContext, useContext, useState } from 'react';
import EditUserModal from '../Pages/Admin/Users/Components/EditUserModal';
import EditProductModal from '../Pages/Admin/Products/Components/EditProductModal';
import EditCategoryModal from '../Pages/Admin/Categories/Components/EditCategoryModal';
import EditWithdrawalRequestModal from '../Pages/Admin/Payments/Components/Withdrawal/EditWithdrawalRequestModal';
// Create the context
const AdminModalContext = createContext();

// Context Provider component
export const AdminModalProvider = ({ children }) => {
	const [isProductModalOpen, setIsProductModalOpen] = useState(false);
	const [isUserModalOpen, setIsUserModalOpen] = useState(false);
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
	const [isWithdrawalRequestModalOpen, setIsWithdrawalRequestModalOpen] =
		useState(false);

	const [product, setProduct] = useState(null);
	const [user, setUser] = useState(null);
	const [category, setCategory] = useState(null);
	const [withdrawalRequest, setWithdrawalRequest] = useState(null);

	// Function to open the withdrawal request modal
	const openWithdrawalRequestModal = (requestData) => {
		setWithdrawalRequest(requestData);
		setIsWithdrawalRequestModalOpen(true);
	};

	// Function to close the withdrawal request modal
	const closeWithdrawalRequestModal = () => {
		setWithdrawalRequest(null);
		setIsWithdrawalRequestModalOpen(false);
	};

	// Functions to open modals
	const openProductModal = (auction) => {
		setProduct(auction);
		setIsProductModalOpen(true);
	};

	const openUserModal = (userData) => {
		setUser(userData);
		setIsUserModalOpen(true);
	};

	const openCategoryModal = (categoryData) => {
		setCategory(categoryData);
		setIsCategoryModalOpen(true);
	};

	// Functions to close modals
	const closeProductModal = () => {
		setProduct(null);
		setIsProductModalOpen(false);
	};

	const closeUserModal = () => {
		setUser(null);
		setIsUserModalOpen(false);
	};

	const closeCategoryModal = () => {
		setCategory(null);
		setIsCategoryModalOpen(false);
	};

	return (
		<AdminModalContext.Provider
			value={{
				openProductModal,
				openUserModal,
				openCategoryModal,
				openWithdrawalRequestModal,
			}}>
			{children}

			{/* Render modals conditionally */}
			{isProductModalOpen && (
				<EditProductModal
					auction={product}
					onClose={closeProductModal}
				/>
			)}

			{isUserModalOpen && (
				<EditUserModal user={user} onClose={closeUserModal} />
			)}

			{isCategoryModalOpen && (
				<EditCategoryModal
					category={category}
					onClose={closeCategoryModal}
				/>
			)}
			{isWithdrawalRequestModalOpen && (
				<EditWithdrawalRequestModal
					request={withdrawalRequest}
					onClose={closeWithdrawalRequestModal}
				/>
			)}
		</AdminModalContext.Provider>
	);
};

// Hook to use the AdminModalContext
export const useAdminModals = () => useContext(AdminModalContext);
