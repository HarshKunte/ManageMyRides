import React from 'react';
import {PDFDownloadLink, StyleSheet, usePDF} from '@react-pdf/renderer'
import InvoiceData from './invoiceData';
import PdfDocument from './PdfDocument';

const styles = StyleSheet.create({
    pdfViewer:{
        width: "100vw",
        minHeight: "100vh"
    }
})

function InvoiceComponent() {
    const [instance, _updateInstance] = usePDF({ document: <PdfDocument invoicedata={InvoiceData} /> });
    return ( 
        <div className='w-full min-h-screen bg-[#f5f5f5] px-auto py-20'>
        
      <div className='download-link'>
        <a href={instance.url} target='_blank' >Download Pdf</a>
        {/* <PDFDownloadLink
          document={<PdfDocument invoicedata={InvoiceData} />}
          fileName="invoice.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading..." : `Download Invoice `
          }
        </PDFDownloadLink> */}
      </div>
        </div>
     );
}





export default InvoiceComponent;