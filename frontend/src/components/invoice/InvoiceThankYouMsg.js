import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 12
    },
    reportTitle: {
        fontSize: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});

const InvoiceThankYouMsg = () => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>*** Thank You ***</Text>
        <Text style={{textAlign:'center', marginTop:40}}>This is computer generated invoice and does not require any signature.</Text>
    </View>
);

export default InvoiceThankYouMsg;