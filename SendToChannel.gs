const postMessageToTelegram = (num) => {
  const chatId = 'YOUR_GROUP_CHAT_ID';
  const row = SpreadsheetApp.getActiveSheet()
  let name = row.getRange('C'+num).getValue()
  let dept = row.getRange('B'+num).getValue()
  let publish = row.getRange('D'+num).getDisplayValue()
  let link = row.getRange('E'+num).getValue()

  const message = "<b>Name: </b>" + name + "\n\n<b>Dept: </b>" + dept + " \n<b>Date: </b>" + publish+"\n\n <a href='" + link +"'>" + "View PDF </a>"

  const BOT_TOKEN = 'YOUR_TOKEN_HERE';

  const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const text = encodeURIComponent(message);

  const url = `${TELEGRAM_API}?chat_id=${chatId}&text=${text}&parse_mode=HTML`;

  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });

  const { ok, description } = JSON.parse(response);

  if (ok !== true) {
    Logger.log(`Error: ${description}`);
  }
};