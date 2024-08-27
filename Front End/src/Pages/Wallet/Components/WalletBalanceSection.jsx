import ThemeButtons from '../../../Components/Buttons/ThemeButton';

const WalletBalanceSection = ({
	walletBalance,
	isAddToWallet,
	setIsAddToWallet,
}) => (
	<div className='flex-[4] sm:order-2 order-1 flex sm:justify-end justify-center'>
		<div>
			<div className='w-52 aspect-video flex flex-col gap-2 justify-center items-center bg-sectionBgColour2'>
				<span>{walletBalance}</span>
				<span className='text-xs'>Available Balance</span>
			</div>
			<div className='mt-4 flex justify-center'>
				<ThemeButtons
					text='Balance'
					onclick={() => setIsAddToWallet((prev) => !prev)}
					icon={
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-4'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M4.5 18.75l7.5-7.5 7.5 7.5'
							/>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M4.5 12.75l7.5-7.5 7.5 7.5'
							/>
						</svg>
					}
					style={6}
					className={'p-2 text-xs'}
				/>
			</div>
		</div>
	</div>
);
export default WalletBalanceSection;
