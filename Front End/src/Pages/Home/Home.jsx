import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/authSlice';
import useApi from '../../Context/AxiosContext';

function Home() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const api = useApi();
	const test = async () => {
		const data = await api.get('api/users/1/');
		console.log(data);
	};
	useEffect(() => {
		test();
	}, [user]);

	return (
		<div>
			Home
			<div>{isAuthenticated}</div>
			<div>
				<button
					className=' bg-errorColour rounded-xl p-2 hover:bg-red-800 active:bg-red-950'
					onClick={() => dispatch(logout())}>
					logout
				</button>
			</div>
		</div>
	);
}

export default Home;
