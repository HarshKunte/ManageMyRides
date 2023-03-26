import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 2,
        justifyContent: 'flex-start',
        width: '50%'
    },
    billTo: {
        marginTop: 18,
        paddingBottom: 3,
        fontSize:12,
        fontFamily: 'Open Sans',
        fontWeight:700
    },
});

const BillTo = ({ invoice }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill To:</Text>
        <Text>{invoice.customer_name}</Text>
        <Text>{invoice.customer_mobile}</Text>
    </View>
);

export default BillTo;