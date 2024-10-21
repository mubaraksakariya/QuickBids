import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Signup/SignUp';
import DashBoard from './Pages/Admin/DashBoard';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useSelector } from 'react-redux';
import { useAuth } from './Context/AuthContext';
import VerifyOtp from './Pages/Signup/VerifyOtp';
import CreateProduct from './Pages/Product/CreateProduct';
import Profile from './Pages/Profile/Profile';
import Wallet from './Pages/Wallet/Wallet';
import UserBids from './Pages/Bids/UserBids';
import EditProfile from './Pages/Profile/EditProfile';
import ResetPassword from './Pages/Profile/ResetPassword';
import ForgotPassword from './Pages/FrogotPassword/ForgotPassword';
import ProductPage from './Pages/Product/ProductPage';
import { ProductProvider } from './Context/ProductContext';
import AdminLogin from './Pages/Admin/Login/AdminLogin';
import AdminUsersMangement from './Pages/Admin/Users/AdminUsersMangement';
import AdminHome from './Pages/Admin/Home/AdminHome';
import AdminProducts from './Pages/Admin/Products/AdminProducts';
import AdminCategoryManagement from './Pages/Admin/Categories/AdminCategoryManagement';
import AdminSales from './Pages/Admin/Sales/AdminSales';
import AdminPaymentManagement from './Pages/Admin/Payments/AdminPaymentManagement';
import AdminNotifications from './Pages/Admin/Notification/AdminNotifications';
import AdminMessages from './Pages/Admin/Message/AdminMessages';
import AdminProtectedRoute from './Components/Route/AdminProtectedRoute';
import UserProtectedRoute from './Components/Route/UserProtectedRoute';
import EditProfileAuction from './Pages/Profile/EditProfileAuction';

function App() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isAdmin = useSelector((state) => state.auth.isAdmin);
	const GOOGLE_CLIENT_ID = import.meta.env.VITE_0AUTH_CLIENT_ID;
	const { isLoading } = useAuth();

	const router = createBrowserRouter([
		{
			path: '/',
			children: [
				{
					path: '',
					element: <Home />,
					// loader: Loader,
				},
				{
					path: 'login',
					element: <Login />,
					// loader: Loader,
				},
				{
					path: 'signup',
					element: <SignUp />,
					// loader: Loader,
				},
				{
					path: 'verify',
					element: <VerifyOtp />,
					// loader: Loader,
				},
				{
					path: 'forgot-password',
					element: <ForgotPassword />,
					// loader: Loader,
				},
				{
					path: 'reset_password',
					element: <ResetPassword />,
				},
				{
					path: 'profile',
					children: [
						{
							path: '',
							element: (
								<UserProtectedRoute>
									<Profile />,
								</UserProtectedRoute>
							),
						},
						{
							path: 'wallet',
							element: (
								<UserProtectedRoute>
									<Wallet />
								</UserProtectedRoute>
							),

							// loader: Loader,
						},
						{
							path: 'bids',
							element: (
								<UserProtectedRoute>
									<UserBids />
								</UserProtectedRoute>
							),

							// loader: Loader,
						},
						{
							path: 'edit-profile',
							element: (
								<UserProtectedRoute>
									<EditProfile />
								</UserProtectedRoute>
							),

							// loader: Loader,
						},
						{
							path: 'edit-auction/:auctionId',
							element: (
								<UserProtectedRoute>
									<EditProfileAuction />
								</UserProtectedRoute>
							),

							// loader: Loader,
						},
					],
				},
				{
					path: 'product',
					children: [
						{
							path: 'create',
							element: (
								<UserProtectedRoute>
									<CreateProduct />
								</UserProtectedRoute>
							),

							// loader: Loader,
						},
						{
							path: ':id', // Dynamic route for product details
							element: <ProductPage />,
						},
					],
				},
				//For admin side

				{
					path: 'admin',
					children: [
						{
							path: 'home',
							element: (
								<AdminProtectedRoute>
									<AdminHome />
								</AdminProtectedRoute>
							),

							// loader: Loader,
						},
						{
							path: '',
							element: (
								<AdminProtectedRoute>
									<AdminHome />
								</AdminProtectedRoute>
							),

							// loader: Loader,
						},
						{
							path: 'login',
							element: <AdminLogin />,
							// loader: Loader,
						},
						{
							path: 'users',
							element: (
								<AdminProtectedRoute>
									<AdminUsersMangement />,
								</AdminProtectedRoute>
							),
							// loader: Loader,
						},
						{
							path: 'products',
							element: (
								<AdminProtectedRoute>
									<AdminProducts />,
								</AdminProtectedRoute>
							),
							// loader: Loader,
						},
						{
							path: 'categories',
							element: (
								<AdminProtectedRoute>
									<AdminCategoryManagement />,
								</AdminProtectedRoute>
							),
							// loader: Loader,
						},
						{
							path: 'sales',
							element: (
								<AdminProtectedRoute>
									<AdminSales />,
								</AdminProtectedRoute>
							),
							// loader: Loader,
						},
						{
							path: 'payments',
							element: (
								<AdminProtectedRoute>
									<AdminPaymentManagement />,
								</AdminProtectedRoute>
							),
							// loader: Loader,
						},
						{
							path: 'notifications',
							element: (
								<AdminProtectedRoute>
									<AdminNotifications />,
								</AdminProtectedRoute>
							),
							// loader: Loader,
						},
						{
							path: 'messages',
							element: (
								<AdminProtectedRoute>
									<AdminMessages />,
								</AdminProtectedRoute>
							),
							// loader: Loader,
						},
					],
				},
			],
		},
	]);

	return (
		<div className='flex flex-col justify-center items-center min-h-[100dvh]'>
			<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
				<ProductProvider>
					{isLoading ? (
						<div className='text-black text-5xl sm:text-6xl md:text-8xl lg:text-9xl'>
							Loading
						</div>
					) : (
						<RouterProvider router={router} />
					)}
				</ProductProvider>
			</GoogleOAuthProvider>
		</div>
	);
}

export default App;
