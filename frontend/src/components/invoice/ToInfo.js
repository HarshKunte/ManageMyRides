import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 2,
        justifyContent: 'flex-start',
        width: '35%'
    },
    billTo: {
        marginTop: 18,
        paddingBottom: 3,
        fontSize:12,
        fontFamily: 'Open Sans',
        fontWeight:700
    },
});

const ToInfo = ({ invoice }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Journey End:</Text>
        <Text>{invoice.to_location}</Text>
        <Text>Date: {invoice.to_date}</Text>
    </View>
);

export default ToInfo;