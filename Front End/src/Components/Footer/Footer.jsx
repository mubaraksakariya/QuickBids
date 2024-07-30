import React from 'react';
import NavigationMenu from './NavigationMenu';
import ContactInfo from './ContactInfo';
import SocialLinks from './SocialLinks';
import Terms from './Terms';

function Footer() {
	return (
		<footer className='bg-black text-white p-16 mt-auto'>
			<div className='flex flex-wrap gap-6'>
				<div className='flex-1 min-w-[200px]'>
					<h1 className='text-2xl font-bold pb-4'>About Us</h1>
					<p>
						Your premier destination for online auctions! At
						QuickBids, we provide a dynamic platform where users can
						put their products up for auction and engage in
						competitive bidding.
					</p>
				</div>
				<ContactInfo />
				<SocialLinks />
				<div className='flex-1 min-w-[200px]'>
					<h1 className='text-2xl font-bold pb-4'>Navigate</h1>
					<NavigationMenu />
				</div>
				<Terms />
			</div>
			<div className='flex flex-col items-center mt-6 text-sm'>
				<span className='mb-2'>All rights reserved to QuickBids</span>
				<div className='flex gap-4'>
					<a href='/privacy-policy' className='hover:underline'>
						Privacy Policy
					</a>
					<span>|</span>
					<a href='/terms-and-conditions' className='hover:underline'>
						Terms & Conditions
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
