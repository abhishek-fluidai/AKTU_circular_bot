
import fetch from 'node-fetch';

const fetchPdf = async (link) => {
const pdf = await fetch(link);
const arrBuf = await pdf.arrayBuffer();
const pdfBuffer = Buffer.from(arrBuf);
return pdfBuffer;
}

export default fetchPdf;