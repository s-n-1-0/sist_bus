function getBusSpreadsheetName() {
  let spreadsheet = getBusSpreadsheet();
  return spreadsheet.getName();
}
function getAorC(rows,sindex,eindex){
return rows.map(function(row,index) {
    var r = null;
  if(row[sindex]=== '' || row[eindex] === ''){
    return null;}
  
    if(isFinite(row[sindex])&&isFinite(row[eindex])){
      r = {HH:row[0],mm:row[sindex],arrival_mm:row[eindex]};
    }
    return r;
  }).filter(Boolean);
}
function getSchedule(spreadsheet) {
  var sheets = spreadsheet.getSheets();
  return sheets.map(function(sheet){
  var rows = sheet.getDataRange().getValues();
  //事前チェック
  rows.map(function(row,index){
    if(index != 0){
      if(!isFinite(row[0])){//数値でない場合
        throw new Error("空白の時間があります。index：" + String(count));
      }
    }
  });
  console.log("チェック完了.jsonを出力します。");
  var mode = rows[0][0];
  if(!isFinite(mode)){
     throw new Error("モード不明");
  return;
  }
  var a2c = getAorC(rows,1,2);
  var c2a = getAorC(rows,3,4);
   return {mode:mode,a2c:a2c,c2a:c2a}
  });
}
function getEx(spreadsheet,sheetName){
  var sheet = spreadsheet.getSheetByName(sheetName);
  var rows = sheet.getDataRange().getValues();
  if(!(rows[0][0] == 0)){
    throw new Error("Ex読み込みできるのはmode:0指定したシートのみです。");
  }
  return rows.map(function(row,index) {
    var r = null;
    var sindex = 6;
    var eindex = 7;
  if(row[sindex]== "" || row[eindex] == "")return null;
  
    if(isFinite(row[sindex])&&isFinite(row[eindex])){
      r = {dd:row[sindex],exception:row[eindex]};
    }
    return r;
  }).filter(Boolean);
}
function getJson(spreadsheet,isNext = false){
  console.log("処理するファイル名:" + spreadsheet.getName());
  //　第2引数はデータのある表のシート名です！
  var exdata = getEx(spreadsheet,'0');
  var data = getSchedule(spreadsheet);
  data = {ex:exdata,data:data};
  if (isNext){
    data["ex"] = [];
  }
  let json = JSON.stringify(data, null, 2);
  console.log(json)
  return json;
}
/**
 * url->json出力
 */
function getJsonByUrl(url) {
  let spreadsheet = SpreadsheetApp.openByUrl(url);
  let json = getJson(spreadsheet);
  var output = ContentService.createTextOutput(json);
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
/**
 * onOpen関数を用いたjson出力
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("SISTバス")
  .addItem("json通常出力", "openDownloadMenu")
  .addSeparator()
  .addSeparator()
  .addSubMenu(ui.createMenu("仮追加").addItem("json仮出力","openNextDownloadMenu"))
  .addToUi();
}
function openDownloadMenu(){
  let html = HtmlService.createTemplateFromFile("download-dialog").evaluate();
  SpreadsheetApp.getUi().showModalDialog(html, "Download!!");
}
function openNextDownloadMenu(){
  let html = HtmlService.createTemplateFromFile("next-download-dialog").evaluate();
  SpreadsheetApp.getUi().showModalDialog(html, "Download!!");
}
function getJsonByMenu(isNext){
  let spreadsheet = getBusSpreadsheet();
  let json = getJson(spreadsheet,isNext);
  return json;
}
function getBusSpreadsheet(){
  let sheet = SpreadsheetApp.getActiveSheet();
  let url = sheet.getRange(2,2).getValue();
  return SpreadsheetApp.openByUrl(url);
}