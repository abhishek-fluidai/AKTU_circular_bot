import Bot from '../../utils/SetupBot.js';
import getCirculars from '../../utils/GetCircular.js';
import fetch from 'node-fetch';
import fetchPdf from '../../utils/FetchPdf.js';


export default  async (event) => {
    // await sendMessage(message.chat.id, "I got your message!");
    Bot.command('circular', async (ctx) => {
        const circular =  await getCirculars(1)
        const {name, date, from, link} = circular[0];
        ctx.replyWithHTML(`<b>Name:</b> ${name} \n\n<b>Date:</b> ${date} \n<b>From:</b> ${from} \n`);
        ctx.reply("Getting PDF..........");
        fetchPdf(link).then((pdf) => {
          ctx.replyWithDocument({source: pdf, filename: name + ".pdf"});
        });
       
    });
    return { statusCode: 200 };
  };

  export const handler = Bot.webhookCallback('/.netlify/functions/update');

  