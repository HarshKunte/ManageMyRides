import React, { useEffect } from "react";
import { Page, Document, StyleSheet, Font, Text, View } from "@react-pdf/renderer";

import InvoiceTitle from "./InvoiceTitle";
import InvoiceNo from "./InvoiceNo";
import BillTo from "./BillTo";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import InvoiceItemsTable from "./InvoiceItemsTable";
import FromInfo from "./FromInfo";
import ToInfo from "./ToInfo";
import font from '../../fonts/Devnagri.ttf'
Font.register({
    family: 'Open Sans',
    fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
    ]
    },
    {
        family: 'Tiro Devanagari Hindi',
        fonts: [
        { src: font}
        ]
        });
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 16,
        paddingLeft: 50,
        paddingRight: 50,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    
});

const PdfDocument = ({ invoicedata }) => {

    useEffect(()=>{
    },[invoicedata])

    if(!invoicedata){
        return <Document>
            <Page size="A4" style={styles.page} >
                <Text>Failed to load Invoice Data</Text>
            </Page>
        </Document>
    }

    return (
        <Document>
            <Page size="A4" style={styles.page} >
                <InvoiceTitle title={'Invoice'} />
                <InvoiceNo invoice={invoicedata} />
                <View style={{display:'flex',flexDirection:'row',rowGap:15, width:'100%'}} >
                <BillTo invoice={invoicedata} />
                <FromInfo invoice={invoicedata} />
                <ToInfo invoice={invoicedata} />
                </View>
                <InvoiceItemsTable invoice={invoicedata} />
                <InvoiceThankYouMsg />
            </Page>
        </Document>
    );
}

export default PdfDocument;