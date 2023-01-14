function FetchFromAKTU() {
  const url = "https://erp.aktu.ac.in/Webpages/Public/Circular/frmCircularForWebsite.aspx"
  const row = SpreadsheetApp.getActiveSheet()

  const html = UrlFetchApp.fetch(url).getContentText();

  const $ = Cheerio.load(html);
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
  var range = SpreadsheetApp.getActiveSheet().getRange(2,1,final.length,5);
  range.setValues(final);
  const third = row.getRange('C4').getValue();
  const second = row.getRange('C3').getValue();
  const first =  row.getRange('C2').getValue();

  if (third != row.getRange('C17').getValue()) {
    postMessageToTelegram(4)
    row.getRange('C17').setValue(third)
  }

  if (second  != row.getRange('C16').getValue()) {
    postMessageToTelegram(3);
    row.getRange('C16').setValue(second);
  }

  if (first  != row.getRange('C15').getValue()) {
    postMessageToTelegram(2)
    row.getRange('C15').setValue(first)
  } 
  else {
    Logger.log("no new changes")
  }

}
