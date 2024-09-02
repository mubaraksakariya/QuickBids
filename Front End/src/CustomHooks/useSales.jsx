import { useQuery } from '@tanstack/react-query';
import useApi from '../Context/AxiosContext'; // Adjust the import according to your project structure

const fetchWeeklySales = async (api, startDate, endDate) => {
	// Construct query parameters if dates are provided
	let query = '';
	if (startDate && endDate) {
		query = `?start_date=${encodeURIComponent(
			startDate
		)}&end_date=${encodeURIComponent(endDate)}`;
	}

	const response = await api.get(`/api/auctions/monthly_sales/${query}`);
	return response.data;
};

const useSales = (startDate, endDate) => {
	const api = useApi();

	return useQuery({
		queryKey: ['weeklySales', startDate, endDate],
		queryFn: () => fetchWeeklySales(api, startDate, endDate),
		enabled: !!api, // Ensure the API instance is available
		staleTime: 60000, // Data is fresh for 1 minute
		cacheTime: 300000, // Cache for 5 minutes
		refetchOnWindowFocus: false, // Disable refetch on window focus
		retry: 1, // Retry failed requests once
	});
};

export default useSales;
