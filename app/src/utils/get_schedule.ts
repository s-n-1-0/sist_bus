/**
 * json形式のスケジュールを取得して処理します。
 */

import axios from "axios";
/**
 * 過去のスケジュール情報をまとめたリストを取得する
 */
export async function getYearList() {
  try {
    const res = await axios.get("/sist_bus/json/schedules/yyyy.json");
    return res.data;
  } catch {
    return null;
  }
}

/**
 * 指定した日付のスケジュールデータを取得します。(存在しなかったりしたらnull)
 * @param yyyy
 * @param mm 
 * @param dd 2026.02 追加.指定日よりダイヤ変更により別のjsonに時刻表が入っている場合の検知に使用。下位互換性維持のためデフォルト引数は1。
 * @param suffix 2025.11 追加.""なら月初めのバス時刻表(下位互換性維持のためデフォルト引数で"")、そうでない(種別が明記されている)ならその(改正)ダイヤの適用開始日又はその時刻表の種別若しくはその両方
 * @param mm0Padding 2026.02 追加.ファイル名のmm部分について、これがtrueなら2桁で0埋めをする
 */
export async function getScheduleJson(
  yyyy: number,
  mm: number,
  dd: number = 1,
  suffix: string = "",
  mm0Padding: boolean = false,
): Promise<ScheduleResponse | null> {
  try {
    let filePath = "/sist_bus/json/schedules/" + String(yyyy) + "/" + String(yyyy) + "_";
    if(mm0Padding){/*mmの2桁0埋め*/
      filePath += "0";
    }
    filePath += String(mm);
    if(suffix != ""){
      filePath += "_" + String(suffix);
    }
    filePath += ".json";
    const res = await axios.get(filePath);
    let json: ScheduleJson = res.data;
    /*読み込んだ時刻表にダイヤ改正があるかを確認 (下のcheckAndFilterScheduleにも同じようなループがあるが大きな変更を避けるため据え置き)*/
    if (json.ex != null) {
      for (let idx in json.ex) {
        if (json.ex[idx].exception == -3) {
          if (json.ex[idx].dd <= dd) {
            return getScheduleJson(yyyy, mm, dd, String(json.ex[idx].dd) + "_" + suffix, false);
          }
        }
      }
    }
    return {
      yyyy: yyyy,
      mm: mm,
      data: json,
    };
  } catch (err) {
    if(!mm0Padding){
      return getScheduleJson(yyyy, mm, dd, suffix, true);
    }else{
      return null;
    }
  }
}

/**
 *  指定した日付が運行しているかどうかのチェック
 * @param schedule
 * @param dd 日
 * @param holidayDefMode 
 * @returns
 */
export function checkAndfilterSchedule(schedule: ScheduleResponse, dd: number, holidayDefMode: number) {
  let day = new Date(schedule.yyyy, schedule.mm - 1, dd, 0, 0, 0).getDay();
  const ex = schedule.data.ex;
  /*土日なら既定で運休、平日なら既定で通常運転*/
  var mode = holidayDefMode;
  if (day != 0 && day != 6) {
    mode = 0;
  }
  /*変則運転・特別運休かどうか*/
  if (ex != null) {
    for (let idx in ex) {
      let e = ex[idx];
      if (e.dd == dd) {
        mode = e.exception;
        break;
      }
    }
  }

  if (mode == -1 || mode == -2) {
    //最終モードが-1/-2なら取得しない(運休)
    return {
      mode: mode,
      schedule: null,
    };
  }
  //通常運転または変則運転情報のみ取得
  return filterSchedule(schedule, mode);
}
// 指定したmodeの時刻表を取得
export function filterSchedule(schedule: ScheduleResponse, mode: number) {
  //データを取得する 全て取得する場合はmode未指定でも可= 0
  let json = schedule.data;
  var sm2 = json.data;
  for (var i in sm2) {
    if (sm2[i].mode == mode) {
      return {
        mode: mode,
        schedule: sm2[i],
      };
    }
  }
  return {
    mode: -1,
    schedule: null,
  };
}
interface ScheduleResponse {
  yyyy: number;
  mm: number;
  data: ScheduleJson;
}
interface ScheduleJson {
  ex: ScheduleEx[];
  data: ScheduleData[];
}
/**
 * 変数はjsonルールに従います。
 */
export interface ScheduleEx {
  dd: number;
  exception: number;
}
/**
 * 変数はjsonルールに従います。
 */
interface ScheduleData {
  mode: number;/*バス: -n:運休, 0:通常運転, 1~, 変則運転 / JR線: -n:運休, 0:平日運転, 1:休日運転: 2~:変則運転*/
  a2c: ScheduleRow[];/*バス: 大学行 / JR線: 上り*/
  c2a: ScheduleRow[];/*バス: 駅行 / JR線: 下り*/
}
/*
* 2025.11 追加
*/
export interface ScheduleViewLine {
  busA: ScheduleRow;
  busC: ScheduleRow;
  jrU: ScheduleRow;
  jrD: ScheduleRow;
}

/**
 * 変数はjsonルールに従います。
 */
export interface ScheduleRow {
  HH: number;
  mm: number;
  arrival_mm: number;
}
