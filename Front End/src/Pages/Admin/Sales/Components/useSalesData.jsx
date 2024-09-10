import { useQuery } from '@tanstack/react-query';
import useApi from '../../../../Context/AxiosContext';

const fetchSalesReport = async (api) => {
	const response = await api.get('/api/report/sales');
	return response.data;
};

const useSalesReport = () => {
	const api = useApi();

	return useQuery({
		queryKey: ['salesReport'],
		queryFn: () => fetchSalesReport(api),
		staleTime: 5 * 60 * 1000, // Cache the data for 5 minutes
	});
};

export default useSalesReport;
