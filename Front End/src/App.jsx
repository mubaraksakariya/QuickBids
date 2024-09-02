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
							element:
								isAuthenticated && !isAdmin ? (
									<Profile />
								) : (
									<Navigate
										to='/login'
										replace={true}
										state={{ from: '/profile/' }}
									/>
								),
						},
						{
							path: 'wallet',
							element:
								isAuthenticated && !isAdmin ? (
									<Wallet />
								) : (
									<Navigate
										to='/login'
										replace={true}
										state={{ from: '/profile/wallet/' }}
									/>
								),
							// loader: Loader,
						},
						{
							path: 'bids',
							element:
								isAuthenticated && !isAdmin ? (
									<UserBids />
								) : (
									<Navigate
										to='/login'
										replace={true}
										state={{ from: '/profile/wallet/' }}
									/>
								),
							// loader: Loader,
						},
						{
							path: 'edit-profile',
							element:
								isAuthenticated && !isAdmin ? (
									<EditProfile />
								) : (
									<Navigate
										to='/login'
										replace={true}
										state={{
											from: '/profile/edit-profile/',
										}}
									/>
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
							element:
								isAuthenticated && !isAdmin ? (
									<CreateProduct />
								) : (
									<Navigate
										to='/login'
										replace={true}
										state={{ from: '/product/create' }}
									/>
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
							path: '',
							element:
								isAuthenticated && isAdmin ? (
									<DashBoard />
								) : (
									<Navigate
										to='/admin/login'
										replace={true}
										state={{ from: '/admin/' }}
									/>
								),
							// loader: Loader,
						},
						{
							path: 'login',
							element: <AdminLogin />,
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
