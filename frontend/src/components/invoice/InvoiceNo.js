import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import BillFrom from './BillFrom';

const styles = StyleSheet.create({
    container:{
        display:"flex",
        marginTop: 36,
        flexDirection:"row"
    },
    invoiceContainer:{
        marginTop: 20,
        paddingBottom: 3,
        width:"40%",
    },
    invoiceNoContainer: {
        flexDirection:"row",
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        width: 60
    }
});

const InvoiceNo = ({ invoice }) => (
    <Fragment>
        <View style={styles.container}>
        <BillFrom invoice={invoice}/>

        <View style={styles.invoiceContainer}>
        <View style={styles.invoiceNoContainer}>
            <Text style={styles.label}>Invoice No:</Text>
            <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
        </View >
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Date: </Text>
            <Text >{invoice.trans_date}</Text>
        </View >
        </View>
        </View>
    </Fragment>
);

export default InvoiceNo;