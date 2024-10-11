import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext';

const fetchTotalSales = async (api) => {
	const response = await api.get('api/auctions/total_sales/');
	return response.data;
};

const useTotalSales = () => {
	const api = useApi();

	return useQuery({
		queryKey: ['totalSales'],
		queryFn: () => fetchTotalSales(api),
	});
};

export default useTotalSales;
