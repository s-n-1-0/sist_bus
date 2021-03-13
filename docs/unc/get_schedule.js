function GetSchedule(yyyy, MM,dd,day,ex, fgot) {
    var mode = -1;
    /*土日ではないか*/
    if(day != 0 && day !=6){
        mode = 0;
    }
    /*特別運行・特別運休かどうか*/
    if(ex != null){

        for (idx in ex){
           let e = ex[idx];
          
          if (e["dd"] == dd){
              
              mode = e["exception"];
              break;
          }
        }
    }


    if(mode == -1){//最終モードが-1なら取得しない(運休)
        fgot(mode,null);
        return;
    }
    getSchedule(yyyy,MM,fgot,mode)
}
function getSchedule(yyyy, MM,fgot,mode,base = "./") { //データを取得する 全て取得する場合はmode未指定でも可= 0
    $.ajax({
        url: base + "unc/json/schedule/" + String(yyyy) + "_" + String(MM) + ".json",
        dataType: 'json',
        success: function( data ) {
            var sm2 = data["data"];
            for (var i in sm2) {
                if (sm2[i]["mode"] == '0') {
                    fgot(mode, sm2[i]);
                    return;
                }
            }
        },
        error: function() {
            fgot(-1, null);
        }
      });
}
function GetScheduleEx(yyyy, MM, fgot,base = "./") {
    $.ajax({
        url: base + "unc/json/schedule/" + String(yyyy) + "_" + String(MM) + ".json",
        dataType: 'json',
        success: function( data ) {
            var sm2 = data["ex"];
            for (i in sm2){
                sm2[i]['comment'] = '';
                switch(sm2[i]['exception']){
                case -2:
                sm2[i]['comment'] = "運休" //確実に運休の場合
                case -1:
                sm2[i]['comment'] = "意図的なデータ未入力(PDF見てください)";
                break;
                case 0:
                sm2[i]['comment'] = "通常運行(本来は運休)";
                break;
                default:
                sm2[i]['comment'] = "特別運行";
                break;
                }
            }
                    fgot(sm2);
                    return;
        },
        error: function() {
            fgot(null);
        }
      });
}