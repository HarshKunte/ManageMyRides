import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36,
        justifyContent: 'flex-start',
        width: '50%'
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Open Sans',
        fontWeight:700
    },
});

const BillTo = ({ invoice }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill To:</Text>
        <Text>{invoice.fullname}</Text>
        <Text>{invoice.address}</Text>
        <Text>{invoice.phone}</Text>
        <Text>{invoice.email}</Text>
    </View>
);

export default BillTo;