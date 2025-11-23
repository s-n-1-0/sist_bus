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
/*到着時刻を自動入力*/
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
function getStationIndex(name, defName/*nameが空の時の既定の駅名*/)
{
  const stationName = [
    /* 各駅の駅番号(CA**の**の部分)をindexとする */
    "熱海","函南","三島","沼津","片浜","原","東田子の浦","吉原","富士","富士川","新蒲原","蒲原","由比","興津","清水","草薙","東静岡",
    "静岡","安倍川","用宗","焼津","西焼津","藤枝","六合","島田","金谷","菊川","掛川","愛野","袋井","御厨","磐田","豊田町","天竜川",
    "浜松","高塚","舞阪","弁天島","新居町","鷲津","新所原","二川","豊橋"
  ];
  if(name === ""){
    name = defName;
  }
  for(let i = 0; i < stationName.length; i++){
    if(name == stationName[i]){
      return i;
    }
  }
  return -1;/*不明な駅名*/
}
/*2025.11 追加 行先を駅番号(CA**の**)に変換(上りは規定(未入力)で熱海、下りは規定(未入力)で浜松行にします)*/
function setArrivalStationIndex() {
  var sheet = SpreadsheetApp.getActiveSheet();

  /*時刻表の範囲を取得*/
  var dataSizeL = getTableDataSizeLine();
  var data = sheet.getRange(2, 2/*左上はB列*/, dataSizeL, 4).getValues();
  /*
  A列に値が入っている限りそこは時刻表とみなす
  B列の値を取得し値があればC列の文字列(行き先駅名)を駅番号に変換*/
  for(let dataL = 0, l; dataL < dataSizeL; dataL++){
    /*操作する行*/
    l = dataL;/*1行目が時刻表のデータ部分ではないため*/

    //愛野駅発
    if(data[l][0] === undefined || data[l][0] === ""){
      data[l][1] = "";
    }else{
      if(data[l][1] === "" || isNaN(Number(data[l][1]))){
        data[l][1] = getStationIndex(String(data[l][1]), String("熱海"));
      }
    }

    //大学発
    if(data[l][2] === undefined || data[l][2] === ""){
      data[l][3] = "";
    }else{
      if(data[l][3] === "" || isNaN(Number(data[l][3]))){
        data[l][3] = getStationIndex(String(data[l][3]), String("浜松"));
      }
    }
  }

  sheet.getRange(2, 2/*左上がB列*/, dataSizeL, 4).setValues(data);
}

/*メニューに追加*/
function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("補助機能")
    .addItem("到着時刻を自動入力", "setArrivalTime")
    .addItem("行先を駅番号に変換", "setArrivalStationIndex")
    .addToUi()
}