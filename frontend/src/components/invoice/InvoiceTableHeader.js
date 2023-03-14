import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#3778C2'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#3778C2',
        backgroundColor: '#3778C2',
        color: '#fff',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        // textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '100%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 10
    },
    
});

const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Details</Text>
        {/* <Text style={styles.qty}>Qty</Text>
        <Text style={styles.rate}>Price</Text>
        <Text style={styles.amount}>Amount</Text> */}
    </View>
);

export default InvoiceTableHeader;