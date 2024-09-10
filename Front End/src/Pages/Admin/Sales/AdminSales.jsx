import React from 'react';
import useSalesData from './Components/useSalesData';

const AdminSales = () => {
	const { data, error, isLoading } = useSalesData();
	if (data) console.log(data);
	if (error) console.log(error);

	return <div>AdminSales</div>;
};

export default AdminSales;
