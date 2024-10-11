import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectedRoute = ({ children }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isAdmin = useSelector((state) => state.auth.isAdmin);
	const location = useLocation(); // Get the current location

	// Check if the user is authenticated and isAdmin
	if (isAuthenticated && isAdmin) {
		return children;
	}

	// Redirect to login if not authenticated or not an admin
	return (
		<Navigate
			to='/admin/login/'
			replace={true}
			state={{ from: location.pathname }}
		/>
	);
};

export default AdminProtectedRoute;
