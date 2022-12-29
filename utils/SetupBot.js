import {Telegraf} from 'telegraf';
import {config} from 'dotenv';
config({production: false});

const Bot = new Telegraf(process.env.BOT_TOKEN);

Bot.start((ctx) => {
    ctx.reply('Welcome to the bot \n\nUse /help to get the list of commands');
    }
);

Bot.help((ctx) => {
    ctx.reply("List of commands: \n\n /start - Start the bot \n /help - Get the list of commands \n /about - Get the information about the bot \n /circular To Get Latest Circular \n /autoupdate To get Automated updates to your inbox" );

});

Bot.command('about', (ctx) => {
    ctx.reply("This bot is made by @actuallyabhi \n\n This bot is made for the students of AKTU to get the latest circulars from the official website of AKTU \n\n This bot is made using Telegraf.js and Node.js \n\n Stay tuned ")  
});

Bot.command('autoupdate', (ctx) => {
    ctx.reply("To get automated updates to your inbox, you need to join the channel @aktucirculars \n\n You will get the latest circulars to your inbox ");
});

// Bot.command('subscribe', (ctx) => {
//     ctx.reply("You have subscribed to the bot \n\n You will now get the latest circulars to your inbox");
// });

// Bot.command('unsubscribe', (ctx) => {
//     ctx.reply("You have unsubscribed from the bot \n\n You will no longer get the latest circulars to your inbox");
// });


export default Bot;
