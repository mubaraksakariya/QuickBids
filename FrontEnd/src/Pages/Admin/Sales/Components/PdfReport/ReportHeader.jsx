import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import styles from './styles';
import { formatDate } from './helpers';

const ReportHeader = ({ currentDate, fromDate, toDate }) => (
	<View style={styles.header}>
		<View>
			<Text style={styles.dateText}>Report Date: {currentDate}</Text>
		</View>
		<View>
			<Text style={styles.dateText}>From: {formatDate(fromDate)}</Text>
			<Text style={styles.dateText}>To: {formatDate(toDate)}</Text>
		</View>
	</View>
);

export default ReportHeader;
