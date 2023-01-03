import { Telegraf } from "telegraf"
import dotenv from "dotenv"
import https from "https"
import { load } from "cheerio";
dotenv.config()
const options = {
  hostname: 'jsonplaceholder.typicode.com',
  path: '/posts',
  method: 'GET'
};


const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start(ctx => {
  try {
    https
  .get(
    "https://erp.aktu.ac.in/Webpages/Public/Circular/frmCircularForWebsite.aspx",
    function (resp) {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });

      resp.on("end", () => {
        const $ = load(data);
        const table = $("table.rstu");
        const rows = table.find("tr");
        const final = [];
        for (let i = 1; i <= 10; i++) {
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
        bot.send(final, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      });
    }
  )
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });
  } catch (error) {
    console.log(error)
  }
})

bot.command('about', (ctx) => {
  ctx.reply("This bot is made by @actuallyabhi \n\n This bot is made for the students of AKTU to get the latest circulars from the official website of AKTU \n\n This bot is made using Telegraf.js and Node.js \n\n Stay tuned ")  
});

// bot.command('circular', (ctx) => {
//  try {
  

//   } catch (e) {
//     console.error("error in circular action:", e)
//     return ctx.reply("Error occured")
//   }
// });

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
export const handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body))
    return { statusCode: 200, body: "" }
  } catch (e) {
    console.error("error in handler:", e)
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
  }
}