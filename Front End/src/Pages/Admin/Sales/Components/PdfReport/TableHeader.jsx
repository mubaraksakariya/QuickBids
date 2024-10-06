import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import styles from './styles';

const TableHeader = () => (
	<View style={styles.tableHeader}>
		<Text style={styles.tableCol}>Product</Text>
		<Text style={styles.tableCol}>Category</Text>
		<Text style={styles.tableCol}>Initial Price</Text>
		<Text style={styles.tableCol}>Buy Now Price</Text>
		<Text style={styles.tableCol}>Winning Amount</Text>
		<Text style={styles.tableCol}>Winner</Text>
		<Text style={styles.tableCol}>Owner</Text>
		<Text style={styles.tableCol}>End Date</Text>
	</View>
);

export default TableHeader;
