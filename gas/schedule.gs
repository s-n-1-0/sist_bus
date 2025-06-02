/*時刻表部分のデータの列数を取得*/
function getTableDataSizeLine() {
  var count = 2;
  var sheet = SpreadsheetApp.getActiveSheet();
  for(let src; ; count++){
    src = sheet.getRange(count, 1/*A列を表す1*/).getValue();
    if(src == undefined || src == ""){
      break;
    }
  }

  return count;
}
function setArrivalTime() {
  var sheet = SpreadsheetApp.getActiveSheet();

  /*時刻表の範囲を取得*/
  var dataSizeL = getTableDataSizeLine();
  var data = sheet.getRange(2, 2/*左上はB列*/, dataSizeL, 4).getValues();
  /*
  A列に値が入っている限りそこは時刻表とみなす
  B列の値を取得し値があればそれに6加算した値をC列にset
  */
  for(let dataL = 0, l; dataL < dataSizeL; dataL++){
    /*操作する行*/
    l = dataL;/*1行目が時刻表のデータ部分ではないため*/

    //愛野駅発
    if(data[l][0] === undefined || data[l][0] === ""){
      data[l][1] = "";
    }else{
      data[l][1] = String((Number(data[l][0])+6) % 60);
    }

    //大学発
    if(data[l][2] === undefined || data[l][2] === ""){
      data[l][3] = "";
    }else{
      data[l][3] = String((Number(data[l][2])+6) % 60);
    }
  }

  sheet.getRange(2, 2/*左上がB列*/, dataSizeL, 4).setValues(data);
}

/*メニューに追加*/
function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("補助機能")
    .addItem("到着時刻を自動入力", "setArrivalTime")
    .addToUi()
}