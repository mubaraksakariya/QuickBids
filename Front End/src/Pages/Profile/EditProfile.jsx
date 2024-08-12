import React, { useState } from 'react';
import NoneHomeNavbar from '../../Components/Navbar/NoneHomeNavbar';
import { useSelector } from 'react-redux';
import UserIcon from '../../Components/Profile/UserIcon';
import Footer from '../../Components/Footer/Footer';
import BasicDetailsEdit from './Components/BasicDetailsEdit';
import BigButton from './Components/BigButton';
import PasswordChange from './Components/PasswordChange';

const EditProfile = () => {
	const [selectedTab, setSelectedTab] = useState('basic');
	const user = useSelector((state) => state.auth.user);

	return (
		<div className='full-page'>
			<NoneHomeNavbar />
			<div className='md:flex py-4'>
				<div className='flex-[4] flex flex-col items-center gap-2 h-[65dvh]'>
					<UserIcon user={user} />
					<div className='mt-4 flex gap-4 md:flex-col md:gap-6'>
						<BigButton
							text='Basic details'
							onclick={() => setSelectedTab('basic')}
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='currentColor'
									className='size-6'>
									<path
										fillRule='evenodd'
										d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
										clipRule='evenodd'
									/>
								</svg>
							}
						/>
						<BigButton
							text='Change password'
							onclick={() => setSelectedTab('password')}
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='currentColor'
									className='size-6'>
									<path
										fillRule='evenodd'
										d='M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
										clipRule='evenodd'
									/>
								</svg>
							}
						/>
					</div>
				</div>
				<div className='flex-[8] py-3'>
					{selectedTab === 'basic' && <BasicDetailsEdit />}
					{selectedTab === 'password' && <PasswordChange />}
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default EditProfile;
