import fetch from "node-fetch";
import fs from "fs";
import { load } from "cheerio";
import path from "path";
const URL =  "https://erp.aktu.ac.in/Webpages/Public/Circular/frmCircularForWebsite.aspx";

const file = fs.readFileSync("data.json", "utf8");
const local_file = "./data.html";


const fetchLatest = async (range = 10) => {
  // console.log()
    return fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      const $ = load(data);
      const table = $("table.rstu");
      const rows = table.find("tr");
      const final = [];
      for (let i = 1; i <= range ; i++) {
        const columns = $(rows[i]).find("td");
        const rowData = [];
        columns.each((index, column) => {
          if (index === 4) {
            const link = $(column).find("a");
            rowData.push(link.attr("href"));
            return;
          }
          rowData.push($(column).text().trim());
        });
        final.push(rowData);
      }
      writeToFile(final);     
    });
};

const writeToFile = async (data) => {
    // const fileData = JSON.parse(file);
    // console.log(fileData);
    // if (fileData === JSON.stringify(data)) {
    //     console.log("No new circulars");
    // }
    // else {
      console.log("New circulars found");
        fs.writeFile(path.resolve("data.json"), JSON.stringify(data), (err) => {
            if (err) {
                console.log(err);
            }
        });

    // }
};


export default fetchLatest;
