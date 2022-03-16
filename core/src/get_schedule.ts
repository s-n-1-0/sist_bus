import axios from "axios";
export async function checkAndGetSchedule(yyyy:number, MM:number,dd:number,day:number,ex:any) {
    var mode = -1;
    /*土日ではないか*/
    if(day != 0 && day !=6){
        mode = 0;
    }
    /*変則運転・特別運休かどうか*/
    if(ex != null){

        for (let idx in ex){
           let e = ex[idx];
          if (e["dd"] == dd){
              
              mode = e["exception"];
              break;
          }
        }
    }


    if(mode == -1 || mode == -2){//最終モードが-1/-2なら取得しない(運休)
        return{
            mode:mode,
            schedule:null
        }
    }
    return await getSchedule(yyyy,MM,mode)
}
export async function getSchedule(yyyy:number, MM:number,mode:number) { //データを取得する 全て取得する場合はmode未指定でも可= 0
    try{
    const res = await axios.get("/sist_bus/unc/json/schedule/" + String(yyyy) + "_" + String(MM) + ".json")
        let data = res.data;
        var sm2 = data["data"];
        for (var i in sm2) {
            if (sm2[i]["mode"] == String(mode)) {
                return{
                    mode:mode,
                    schedule:sm2[i]
                }
            }
        }
    }catch(err){
        return {
            mode:-1,
            schedule:null
        }
    }
}
export async function getScheduleEx(yyyy:number, MM:number){
    try{
   const res = await axios.get("/sist_bus/unc/json/schedule/" + String(yyyy) + "_" + String(MM) + ".json")
        let data = res.data;
        var sm2 = data["ex"];
        for (let i in sm2){
            sm2[i]['comment'] = '';
            switch(sm2[i]['exception']){
            case -2:
                    sm2[i]['comment'] = "運休" //確実に運休の場合
                    break
            case -1:
            sm2[i]['comment'] = "意図的なデータ未入力(PDF見てください)";
            break;
            case 0:
            sm2[i]['comment'] = "通常運転(本来は運休)";
            break;
            default:
            sm2[i]['comment'] = "変則運転";
            break;
            }
        }
        return sm2;
    }catch(err){
        return null;
    };
}
export function schedule2ScheduleUI(schedule:any){
    for(let key in schedule){
        let i = Number(key);
    if (i == 0 || schedule[i - 1].HH != schedule[key].HH){
        schedule[key]["isShowHH"] = true
    }else{
        schedule[key]["isShowHH"] = false
    }
    }
    return schedule
}

export async function getYearList(){
    try{
      const res =  await axios.get("/sist_bus/unc/json/schedule/yyyy.json");
      return res.data
    }catch{
        return null;
    }
}