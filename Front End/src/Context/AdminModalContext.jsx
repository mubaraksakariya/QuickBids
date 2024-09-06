import React, { createContext, useContext, useState } from 'react';
import EditUserModal from '../Pages/Admin/Users/Components/EditUserModal';
import EditProductModal from '../Pages/Admin/Products/Components/EditProductModal';

// Create the context
const AdminModalContext = createContext();

// Context Provider component
export const AdminModalProvider = ({ children }) => {
	const [isProductModalOpen, setIsProductModalOpen] = useState(false);
	const [isUserModalOpen, setIsUserModalOpen] = useState(false);
	const [product, setProduct] = useState(null);
	const [user, setUser] = useState(null);

	// Functions to open modals
	const openProductModal = (auction) => {
		setProduct(auction);
		setIsProductModalOpen(true);
	};

	const openUserModal = (userData) => {
		setUser(userData);
		setIsUserModalOpen(true);
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

	return (
		<AdminModalContext.Provider
			value={{
				openProductModal,
				openUserModal,
			}}>
			{children}

			{/* Render modals conditionally */}
			{isProductModalOpen && (
				<EditProductModal
					auctions={product}
					onClose={closeProductModal}
				/>
			)}

			{isUserModalOpen && (
				<EditUserModal user={user} onClose={closeUserModal} />
			)}
		</AdminModalContext.Provider>
	);
};

// Hook to use the AdminModalContext
export const useAdminModals = () => useContext(AdminModalContext);
