import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
	page: {
		padding: 20,
		fontSize: 10,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	titleSection: {
		textAlign: 'center',
		marginBottom: 10,
	},
	titleText: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	subtitleText: {
		fontSize: 12,
		marginTop: 5,
	},
	dateText: {
		fontSize: 12,
	},
	tableHeader: {
		fontWeight: 'bold',
		fontSize: 12,
		flexDirection: 'row',
		borderBottom: '1 solid black',
		paddingBottom: 5,
	},
	tableRow: {
		flexDirection: 'row',
		paddingVertical: 5,
	},
	tableCol: {
		width: '14%', // Adjust width according to the number of columns
		paddingHorizontal: 5,
		fontSize: 10,
	},
	footer: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		fontSize: 10,
		textAlign: 'center',
	},
	totalRow: {
		fontWeight: 'bold',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 10,
		fontSize: 12,
	},
	totalText: {
		marginTop: 5,
		width: '12.5%',
		paddingHorizontal: 5,
	},
	pageNumber: {
		position: 'absolute',
		bottom: 10,
		right: 20,
		fontSize: 10,
	},
});

export default styles;
