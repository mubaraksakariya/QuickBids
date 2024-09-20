import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectedRoute = ({ children }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isAdmin = useSelector((state) => state.auth.isAdmin);

	// Check if the user is authenticated and isAdmin
	if (isAuthenticated && isAdmin) {
		return children;
	}

	// Redirect to login if not authenticated or not an admin
	return <Navigate to='/admin/login/' replace />;
};

export default AdminProtectedRoute;
