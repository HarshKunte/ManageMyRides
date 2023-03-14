import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
Font.register({
    family: 'Open Sans',
    fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
    ]
    });
const borderColor = '#3778C2'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#3778C2',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontFamily:'Open Sans',
        fontWeight: 700,
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
        
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
});

const InvoiceTableFooter = ({ items }) => {
    const total = items.map(item => item.qty * item.rate)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return (
        <View style={styles.row}>
            <Text style={styles.description}>TOTAL</Text>
            <Text style={styles.total}>{Number.parseFloat(total).toFixed(2)}</Text>
        </View>
    )
};

export default InvoiceTableFooter;