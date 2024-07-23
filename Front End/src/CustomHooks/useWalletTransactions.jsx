import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchTransaction = async (api) => {
	const response = await api.get('/api/transactions/');
	return response.data;
};

const useWalletTransactions = () => {
	const api = useApi();

	return useQuery({
		queryKey: ['Transactions'],
		queryFn: () => fetchTransaction(api),
	});
};

export default useWalletTransactions;
