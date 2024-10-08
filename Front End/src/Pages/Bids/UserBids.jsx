import React, { useState } from 'react';
import NoneHomeNavbar from '../../Components/Navbar/NoneHomeNavbar';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserIcon from '../../Components/Profile/UserIcon';
import LeftSideNav from './Components/LeftSideNav';
import CurrentBids from './Components/CurrentBids';
import CompletedBids from './Components/CompletedBids';
import FailedBids from './Components/FailedBids';
import Footer from '../../Components/Footer/Footer';

function UserBids() {
	const user = useSelector((state) => state.auth.user);
	// const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
	const [selectdTab, setSetlectedTab] = useState('current');
	const getSelectedTab = () => {
		if (selectdTab == 'current') return <CurrentBids />;
		if (selectdTab == 'completed') return <CompletedBids />;
		if (selectdTab == 'failed') return <FailedBids />;
	};

	return (
		<div className='full-page'>
			<NoneHomeNavbar />
			<div className='md:flex py-4'>
				<div className='flex-[4] flex flex-col items-center gap-2 md:min-h-[65dvh]'>
					<UserIcon user={user} />
					<h1 className=' font-bold text-xl'>Your Bids</h1>
					<LeftSideNav setSetlectedTab={setSetlectedTab} />
				</div>
				<div className='flex-[8] flex flex-col md:max-h-[80dvh] md:overflow-y-scroll py-3'>
					{getSelectedTab()}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default UserBids;
