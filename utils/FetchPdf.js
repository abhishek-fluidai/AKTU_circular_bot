import fetch from "node-fetch";
import fs from "fs";

const fetchPdf = async (link) => {
 try { const pdf = await fetch(link);
  const arrBuf = await pdf.arrayBuffer();
  const pdfBuffer = Buffer.from(arrBuf);
  fs.writeFileSync("lastest.pdf", pdfBuffer);
 } catch (error) {
  console.log(error);
 }
  
};

export default fetchPdf;
