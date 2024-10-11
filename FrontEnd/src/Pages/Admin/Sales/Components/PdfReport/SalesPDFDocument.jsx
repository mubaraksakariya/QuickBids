import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import ReportHeader from './ReportHeader';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TotalRow from './TotalRow';
import Footer from './Footer';
import { calculateTotalSales, formatDate } from './helpers';
import styles from './styles';

const SalesPDFDocument = ({ sales, fromDate, toDate }) => {
	const currentDate = formatDate(new Date());
	const totalSales = calculateTotalSales(sales);

	return (
		<Document>
			<Page size='A4' style={styles.page} orientation='landscape'>
				{/* Title Section */}
				<View style={styles.titleSection}>
					<Text style={styles.titleText}>Quick Bids</Text>
					<Text style={styles.subtitleText}>Sales Report</Text>
				</View>

				{/* Header */}
				<ReportHeader
					currentDate={currentDate}
					fromDate={fromDate}
					toDate={toDate}
				/>

				{/* Table Header */}
				<TableHeader />

				{/* Table Rows */}
				{sales?.map((auction) => (
					<TableRow auction={auction} key={auction.id} />
				))}

				{/* Total Row */}
				<TotalRow totalSales={totalSales} />

				{/* Footer */}
				<Footer />

				{/* Page Number */}
				<Text
					style={styles.pageNumber}
					render={({ pageNumber, totalPages }) =>
						`${pageNumber} / ${totalPages}`
					}
				/>
			</Page>
		</Document>
	);
};

export default SalesPDFDocument;
