import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserProtectedRoute = ({ children }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isAdmin = useSelector((state) => state.auth.isAdmin);
	const location = useLocation(); // Get the current location

	if (isAuthenticated && !isAdmin) {
		return children;
	}

	return (
		<Navigate
			to='/login/'
			replace={true}
			state={{ from: location.pathname }}
		/>
	);
};

export default UserProtectedRoute;
