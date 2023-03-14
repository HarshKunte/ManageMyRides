import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';



const styles = StyleSheet.create({
    headerContainer: {
        width: '60%'
    },
    billFrom: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily:'Open Sans',
        fontWeight:800      
    },
});

const BillFrom = ({ invoice }) => (
    <View style={styles.headerContainer}>
        <Text  style={styles.billFrom}>SAMPADA TRAVELS</Text>
        <Text>{invoice.fullname}</Text>
        <Text>{invoice.address}</Text>
        <Text>{invoice.phone}</Text>
        <Text>{invoice.email}</Text>
    </View>
);

export default BillFrom;