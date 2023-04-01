import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 2,
        justifyContent: 'flex-start',
        width: '35%',
        marginRight:'3%'
    },
    billTo: {
        marginTop: 18,
        paddingBottom: 3,
        fontSize:12,
        fontFamily: 'Open Sans',
        fontWeight:700
    },
});

const FromInfo = ({ invoice }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Journey Start:</Text>
        <Text>{invoice.from_location}</Text>
        <Text>Date: {invoice.from_date}</Text>
    </View>
);

export default FromInfo;