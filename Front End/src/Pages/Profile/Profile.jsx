import React from 'react';
import NoneHomeNavbar from '../../Components/Navbar/NoneHomeNavbar';
// import { timeAgo } from '../../Components/Utilities/timeAgo';
import { useSelector } from 'react-redux';
import timeAgo from '../../Components/Utilities/timeAgo';
import { useNavigate } from 'react-router-dom';
import BigButton from './Components/BigButton';
import ProfilePosts from './Components/ProfilePosts';

function Profile() {
	const user = useSelector((state) => state.auth.user);
	const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
	const navigate = useNavigate();

	return (
		<div className='min-h-[100dvh] max-h-[100dvh] w-full md:w-[90%] bg-themeBgColour'>
			<NoneHomeNavbar />
			<div className='md:flex'>
				<div className='flex-[4] flex flex-col justify-center items-center gap-2 h-auto max-h-[55dvh]'>
					<div className='overflow-hidden rounded-full flex justify-center items-center w-auto max-w-60 '>
						{/* <img className=' w-full' src='/quick bids photos1.png' alt='' /> */}
						<img
							className=' w-full'
							src={baseUrl + user.profile_picture}
							alt=''
						/>
					</div>
					<div>
						<h1 className=' text-3xl'>{user.first_name}</h1>
					</div>
					<div className='flex gap-2'>
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
								d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
							/>
						</svg>

						<p>Member since {timeAgo(user.created_at)}</p>
					</div>
					<div className='mt-4 flex gap-4 md:flex-col md:gap-6'>
						<BigButton
							className={'order-2'}
							text='Edit profile'
							onclick={() => navigate('edit')}
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
				<div className='flex-[8] flex flex-col md:max-h-[87dvh] md:overflow-y-scroll py-3'>
					<ProfilePosts />
				</div>
			</div>
		</div>
	);
}

export default Profile;
