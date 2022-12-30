import fetch from "node-fetch";
import fs from "fs";
import Bot from "./SetupBot.js";
import { load } from "cheerio";
const URL =
  "https://erp.aktu.ac.in/Webpages/Public/Circular/frmCircularForWebsite.aspx";

const fetchLatest = async () => {
  try {
    // const data = fs.readFileSync("index.html", "utf8");
    fetch(URL)
      .then((response) => response.text())
      .then((data) => {
        const $ = load(data);
        const table = $("table.rstu");
        const rows = table.find("tr");
        const final = [];
        for (let i = 1; i < 2; i++) {
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
        console.log(final);
        fs.writeFileSync("data.json", JSON.stringify(final), (err) => {
          if (err) {
            console.log(err);

            return Bot.telegram.sendMessage(
              5381254341,
              "Error in fetching circulars"
              )
          }
          return final[0]
          console.log("File written");
        });
      });
  } catch (error) {
    console.log(error);
  }

  // fetch(URL)
  // .then((response) => response.text())
  // .then((data) => {
  //   fs.writeFileSync(path.resolve("index.html"), data, (err) => {
  //     if (err) {
  //         console.log(err);
  //     }
  //     console.log("File written");
  // });

  // const $ = load(data);
  // const table = $("table.rstu");
  // const rows = table.find("tr");
  // const final = [];
  // for (let i = 1; i <= range ; i++) {
  //   const columns = $(rows[i]).find("td");
  //   const rowData = [];
  //   columns.each((index, column) => {
  //     if (index === 4) {
  //       const link = $(column).find("a");
  //       rowData.push(link.attr("href"));
  //       return;
  //     }
  //     rowData.push($(column).text().trim());
  //   });
  //   final.push(rowData);
  // }
  // console.log(final);
  // writeToFile(final);
  // });
};

export default fetchLatest;
