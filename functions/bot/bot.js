import { Telegraf } from "telegraf"
import dotenv from "dotenv"
dotenv.config()
// const { fetchLatest } = require("./utils/FetchCircular.mjs")
// import { fetchLatest } from "./utils/FetchCircular.js"
// const { getCircular } = require("./utils/GetCircular")


console.log(process.env.BOT_TOKEN)
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
  console.log("Received /start command")
  try {
    return ctx.reply("Hi")
  } catch (e) {
    console.error("error in start action:", e)
    return ctx.reply("Error occured")
  }

})

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