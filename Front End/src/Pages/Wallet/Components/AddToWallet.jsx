import React, { useState } from 'react';
import ThemeButtons from '../../../Components/Buttons/ThemeButton';
import RazorpayButton from './RazorpayButton';

function AddToWallet({ setIsAddToWallet }) {
	const [error, setError] = useState();
	const [amount, setAmount] = useState(0);

	return (
		<div className='absolute inset-0 z-50 bg-black bg-opacity-50 flex flex-col justify-center items-center'>
			<div className=' bg-sectionBgColour2 shadow-lg rounded-lg'>
				<div className='flex flex-col gap-5 justify-center items-center relative p-10'>
					<h2 className='text-xl font-semibold mb-2'>
						Add to Wallet
					</h2>
					<div className=''>
						<label className='block pb-3' htmlFor='amount'>
							Enter amount
						</label>
						<input
							type='number'
							onChange={(e) => {
								setError('');
								setAmount(e.target.value);
							}}
							name='amount'
							id='amount'
							className={`border p-1 rounded w-full ${
								error ? ' border-errorColour' : ''
							}`}
						/>
						<p className='text-center text-xs text-gray-500 mt-1'>
							1 rupee = 1 point
						</p>
						<span className='absolute text-errorColour text-xs'>
							{error}
						</span>
					</div>
					<div className='flex justify-center gap-4 mt-4'>
						<RazorpayButton
							amount={amount}
							setError={setError}
							setIsAddToWallet={setIsAddToWallet}
						/>
						<ThemeButtons
							text='Cancel'
							onclick={() => setIsAddToWallet(false)}
							style={5}
							className={'p-2'}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddToWallet;
