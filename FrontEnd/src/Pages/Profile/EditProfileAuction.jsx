import React from 'react';
import NoneHomeNavbar from '../../Components/Navbar/NoneHomeNavbar';
import Footer from '../../Components/Footer/Footer';
import EditUserAuction from '../Profile/Components/Auction/EditUserAuction';
import { useNavigate, useParams } from 'react-router-dom';
function EditProfileAuction() {
	const { auctionId } = useParams();
	const navigate = useNavigate();

	return (
		<div className='full-page'>
			<NoneHomeNavbar />
			<EditUserAuction
				auctionId={auctionId}
				onClose={() => navigate('/profile/')}
			/>
			<Footer />
		</div>
	);
}

export default EditProfileAuction;
