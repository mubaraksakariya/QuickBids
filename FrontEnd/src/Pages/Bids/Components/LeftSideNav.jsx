import React from 'react';
import BigButton from '../../Profile/Components/BigButton';

function LeftSideNav({ setSetlectedTab }) {
	return (
		<div className='mt-4 flex gap-4 md:flex-col md:gap-6'>
			<BigButton
				className={'order-2'}
				text='Current'
				onclick={() => setSetlectedTab('current')}
			/>
			<BigButton
				text='Completed'
				className={'order-1'}
				onclick={() => setSetlectedTab('completed')}
			/>
			<BigButton
				className={'order-3'}
				text='Failed'
				onclick={() => setSetlectedTab('failed')}
			/>
		</div>
	);
}

export default LeftSideNav;
