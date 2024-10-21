import React from 'react';
import NoneHomeNavbar from '../../Components/Navbar/NoneHomeNavbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BigButton from './Components/BigButton';
import ProfilePosts from './Components/ProfilePosts';
import Footer from '../../Components/Footer/Footer';
import UserIcon from '../../Components/Profile/UserIcon';

function Profile() {
	const user = useSelector((state) => state.auth.user);
	const navigate = useNavigate();

	return (
		<div className='full-page'>
			<NoneHomeNavbar />
			<div className='md:flex py-4'>
				<div className='flex-[4] flex flex-col items-center gap-2 md:min-h-[65dvh]'>
					<UserIcon user={user} />
					<div className='mt-4 flex gap-4 md:flex-col md:gap-6'>
						<BigButton
							className={'order-2'}
							text='Edit profile'
							onclick={() => navigate('edit-profile')}
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-6'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
									/>
								</svg>
							}
						/>
						<BigButton
							text='Bids'
							className={'order-1'}
							onclick={() => navigate('bids')}
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-6'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002'
									/>
								</svg>
							}
						/>
						<BigButton
							className={'order-3'}
							text='Wallet'
							onclick={() => navigate('wallet')}
							icon={
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-6'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
									/>
								</svg>
							}
						/>
					</div>
				</div>
				<div className='flex-[8] flex flex-col md:max-h-[65dvh] md:overflow-y-scroll py-3 relative'>
					<ProfilePosts />
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Profile;
