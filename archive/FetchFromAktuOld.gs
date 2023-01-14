function myFunction() {
  const sheetName = "Sheet1";  
  const url = "https://erp.aktu.ac.in/Webpages/Public/Circular/frmCircularForWebsite.aspx";
  const row = SpreadsheetApp.getActiveSheet()
  let latest_circular = row.getRange('C2').getValue()
  let last_circular = row.getRange('G2').getValue()

  
  const html = UrlFetchApp.fetch(url).getContentText();
  const table = html.match(/<table[\s\S\w]+?<\/table>/);
  
  if (table) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const requests = { requests: [{ pasteData: { html: true, data: table[0], coordinate: { sheetId: ss.getSheetByName(sheetName).getSheetId() } } }] };
    Sheets.Spreadsheets.batchUpdate(requests, ss.getId());
    if (latest_circular != last_circular)  {
        postMessageToTelegram()

    }
    return;
  }
  throw new Error("Table cannot be retrieved.");
}