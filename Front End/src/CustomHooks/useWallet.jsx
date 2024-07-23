import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchWallet = async (api) => {
	const response = await api.get('/api/wallet/');
	return response.data;
};

const useWallet = () => {
	const api = useApi();

	return useQuery({
		queryKey: ['wallet'],
		queryFn: () => fetchWallet(api),
	});
};

export default useWallet;
