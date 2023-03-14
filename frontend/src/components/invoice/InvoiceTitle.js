import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 16,
    },
    reportTitle: {
        color: '#3778C2',
        letterSpacing: 2,
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});

const InvoiceTitle = ({ title }) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title}</Text>
    </View>
);

export default InvoiceTitle;