import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import styles from './styles';
import { formatDate } from './helpers';

const TableRow = ({ auction }) => (
	<View style={styles.tableRow} key={auction.id}>
		<Text style={styles.tableCol}>{auction.product.title}</Text>
		<Text style={styles.tableCol}>{auction.product.category.name}</Text>
		<Text style={styles.tableCol}>{auction.initial_prize}</Text>
		<Text style={styles.tableCol}>
			{auction.product.buy_now_prize || '-'}
		</Text>
		<Text style={styles.tableCol}>
			{auction.winning_bid
				? auction.winning_bid.amount
				: auction.product.buy_now_prize}
		</Text>
		<Text style={styles.tableCol}>
			{auction.winner ? auction.winner.email : '-'}
		</Text>
		<Text style={styles.tableCol}>
			{`${auction.product.owner.first_name} ${auction.product.owner.last_name}`}
		</Text>
		<Text style={styles.tableCol}>{formatDate(auction.end_time)}</Text>
	</View>
);

export default TableRow;
