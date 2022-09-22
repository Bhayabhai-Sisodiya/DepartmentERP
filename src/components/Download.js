import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const Download = ({rootElementId , downloadFileName}) => {
    console.log(rootElementId);

    const downloadPdfDocument = async() => {
        const input = document.getElementById(rootElementId);

        console.log(input);
        html2canvas(input)
            .then((canvas) => {
                // const imgData = canvas.toDataURL('image/png');
                var pdf = new jsPDF('m', 'pt', "a0");
                // pdf.addImage(imgData, 'JPEG', 0, 0);
                //autoTable(pdf, "#PrintData");
                pdf.autoTable({
                    html: '#PrintData',
                    startY: 60,
                    styles: {
                      fontSize: 50,
                      cellWidth: 'wrap'
                    },
                    columnStyles: {
                      1: {columnWidth: 'auto'}
                    }
                  })
                pdf.save({downloadFileName}.pdf);
            }).catch(error => console.log(error));
    }
    return <button onClick={downloadPdfDocument}>Download Pdf</button>
}

 
export default Download;