import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchIFSCDetails = async (ifscCode) => {
	if (!ifscCode) {
		throw new Error('IFSC code is required');
	}
	const { data } = await axios.get(`https://ifsc.razorpay.com/${ifscCode}`);
	return data;
};

const useFetchIFSCDetails = (ifscCode) => {
	return useQuery({
		queryKey: ['ifscDetails', ifscCode],
		queryFn: () => fetchIFSCDetails(ifscCode),
		enabled: !!ifscCode,
		retry: false,
	});
};

export default useFetchIFSCDetails;
