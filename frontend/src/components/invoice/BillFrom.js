import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';



const styles = StyleSheet.create({
    headerContainer: {
        width: '60%',
        marginTop: 20,
    },
    billFrom: {
        paddingBottom: 3,
        fontFamily:'Open Sans',
        fontSize:16,
        fontWeight:800      
    },
});

const BillFrom = ({ invoice }) => {
    return(
    <View style={styles.headerContainer}>
        <Text  style={styles.billFrom}>{invoice.company_name.toUpperCase()}</Text>
        <Text>{invoice.user_name}</Text>
        <Text>{invoice.user_mobile}</Text>
        <Text>{invoice.user_email}</Text>
    </View>
    )
};

export default BillFrom;