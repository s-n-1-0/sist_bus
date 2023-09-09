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
 * @param MM
 */
export async function getScheduleJson(
  yyyy: number,
  MM: number
): Promise<ScheduleResponse | null> {
  try {
    const res = await axios.get(
      `/sist_bus/json/schedules/${String(yyyy)}/${String(yyyy)}_${String(
        MM
      )}.json`
    );
    let json: ScheduleJson = res.data;
    return {
      yyyy,
      MM,
      data: json,
    };
  } catch (err) {
    return null;
  }
}

/**
 *  指定した日付が運行しているかどうかのチェック
 * @param schedule
 * @param dd 日
 * @returns
 */
export function checkAndfilterSchedule(schedule: ScheduleResponse, dd: number) {
  let day = new Date(schedule.yyyy, schedule.MM - 1, dd, 0, 0, 0).getDay();
  const ex = schedule.data.ex;
  var mode = -1;
  /*土日ではないか*/
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
  MM: number;
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
  mode: number;
  a2c: ScheduleRow[];
  c2a: ScheduleRow[];
}
/**
 * 変数はjsonルールに従います。
 */
export interface ScheduleRow {
  HH: number;
  mm: number;
  arrival_mm: number;
}
