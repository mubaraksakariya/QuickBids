import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import styles from './styles';

const TotalRow = ({ totalSales }) => (
	<View style={styles.totalRow}>
		<Text style={styles.totalText}>Total Sales: </Text>
		<Text style={styles.totalText}>{totalSales}</Text>
	</View>
);

export default TotalRow;
