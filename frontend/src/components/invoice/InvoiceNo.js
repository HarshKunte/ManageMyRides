import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import BillFrom from './BillFrom';
import moment from 'moment';

const styles = StyleSheet.create({
    container:{
        display:"flex",
        marginTop: 4,
        flexDirection:"row"
    },
    invoiceContainer:{
        marginTop: 24,
        width:"40%",
    },
    invoiceNoContainer: {
        flexDirection:"row",
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        marginTop:4,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        marginRight:2
    }
});

const InvoiceNo = ({ invoice }) => (
    <Fragment>
        <View style={styles.container}>
        <BillFrom invoice={invoice}/>

        <View style={styles.invoiceContainer}>
        <View style={styles.invoiceNoContainer}>
            <Text style={styles.label}>Invoice No:</Text>
            <Text style={styles.invoiceDate}>{invoice.id}</Text>
        </View >
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Date: </Text>
            <Text >{moment(invoice.date).format('DD-MM-YYYY')}</Text>
        </View >
        </View>
        </View>
    </Fragment>
);

export default InvoiceNo;