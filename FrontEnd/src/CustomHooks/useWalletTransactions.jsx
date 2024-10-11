import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchTransaction = async (api, pageNumber, pageSize) => {
	let params = {
		page: pageNumber,
		page_size: pageSize,
	};
	const response = await api.get('/api/transactions/', { params });
	return response.data;
};

const useWalletTransactions = (pageNumber, pageSize = 5) => {
	const api = useApi();

	return useQuery({
		queryKey: ['Transactions', pageNumber, pageSize],
		queryFn: () => fetchTransaction(api, pageNumber, pageSize),
	});
};

export default useWalletTransactions;
