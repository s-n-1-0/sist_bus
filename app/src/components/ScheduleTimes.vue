<template>
  <div>
    <div class="text-center">
      <a
        class="introvert2"
        href="https://forms.office.com/r/ScTPv7aquy"
        >時刻表示ミスがある場合の報告</a
      ><br />
    </div>
    <div v-if="toC">
      <table>
        <thead>
          <tr>
            <th>　時刻　</th>
            <th>愛野駅発</th>
            <th></th>
            <th> 大学着 </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in schedule.schedule_bus_sist_c" :key="row">
            <td>
              <b v-if="checkShowHH(Number(i), schedule.schedule_bus_sist_c)">{{ row.HH }}時</b>
            </td>
            <template v-if="getShowType(row) === 'normal'">
              <td>{{ showDepartureTime(row) }}</td>
              <td>→</td>
              <td>{{ showArrivalTime(row) }}</td>
            </template>
            <template v-else-if="getShowType(row) === 'piston'">
              <td>{{ showDepartureTime(row, 100) }}</td>
              <td>～</td>
              <td>{{ showArrivalTime(row) }}</td>
            </template>
            <template v-else>
              <td></td>
              <td></td>
              <td></td>
            </template>
          </tr>
        </tbody>
      </table>
      <hr>
      <div class = "table-notes">{{ showTableNotes() }}</div>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>　時刻　</th>
            <th> 大学発 </th>
            <th></th>
            <th>愛野駅着</th>
            <th v-if="'schedule_jr_d' in schedule" class="table-JRSchedule-displayStyle">
              <label for="JRScheduleDisplayStyle">JR下り</label><br>
              <select name="JRScheduleDisplayStyle" id="JRScheduleDisplayStyle" v-on:change="onChangeJRDScheduleDisplayStyle">
                <option value="part">一部</option>
                <option value="all">全て</option>
              </select>
            </th>
            <th v-if="'schedule_jr_u' in schedule" class="table-JRSchedule-displayStyle">
              <label for="JRScheduleDisplayStyle">JR上り</label><br>
              <select name="JRScheduleDisplayStyle" id="JRScheduleDisplayStyle" v-on:change="onChangeJRUScheduleDisplayStyle">
                <option value="part">一部</option>
                <option value="all">全て</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="schedule_jr_d_display_style===1 || schedule_jr_u_display_style===1">
            <td><b>始発バス前</b></td>
            <td></td>
            <td></td>
            <td></td>
            <td v-if="'schedule_jr_d' in schedule">{{ showNextJR(schedule.schedule_bus_sist_a, Number(-1), schedule.schedule_jr_d, schedule.defTransferTimeMust, false, schedule_jr_d_display_style) }}</td>
            <td v-if="'schedule_jr_u' in schedule">{{ showNextJR(schedule.schedule_bus_sist_a, Number(-1), schedule.schedule_jr_u, schedule.defTransferTimeMust, true, schedule_jr_u_display_style) }}</td>
          </tr>
          <tr v-for="(row, i) in schedule.schedule_bus_sist_a" :key="row">
            <td>
              <b v-if="checkShowHH(Number(i), schedule.schedule_bus_sist_a)">{{ row.HH }}時</b>
            </td>
            <template v-if="getShowType(row) === 'normal'">
              <td>{{ showDepartureTime(row) }}</td>
              <td>→</td>
              <td>{{ showArrivalTime(row) }}</td>
              <td v-if="'schedule_jr_d' in schedule">{{ showNextJR(schedule.schedule_bus_sist_a, Number(i), schedule.schedule_jr_d, schedule.defTransferTimeMust, false, schedule_jr_d_display_style) }}</td>
              <td v-if="'schedule_jr_u' in schedule">{{ showNextJR(schedule.schedule_bus_sist_a, Number(i), schedule.schedule_jr_u, schedule.defTransferTimeMust, true, schedule_jr_u_display_style) }}</td>
            </template>
            <template v-else-if="getShowType(row) === 'piston'">
              <td>{{ showDepartureTime(row, 100) }}</td>
              <td>～</td>
              <td>{{ showArrivalTime(row) }}迄<br>ピストン運行</td>
              <td v-if="'schedule_jr_d' in schedule" v-html="showNextJR(schedule.schedule_bus_sist_a, Number(i), schedule.schedule_jr_d, row.arrival_mm, false, schedule_jr_d_display_style) + '\n' + showNextJR(schedule.schedule_bus_sist_a, Number(i), schedule.schedule_jr_d, schedule.defTransferTimeMust, false, schedule_jr_d_display_style)"></td>
              <td v-if="'schedule_jr_u' in schedule" v0html="showNextJR(schedule.schedule_bus_sist_a, Number(i), schedule.schedule_jr_u, row.arrival_mm, true, schedule_jr_u_display_style) + '\n' + showNextJR(schedule.schedule_bus_sist_a, Number(i), schedule.schedule_jr_d, schedule.defTransferTimeMust, true, schedule_jr_u_display_style)"></td>
            </template>
            <template v-else>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </template>
            
          </tr>
        </tbody>
      </table>
      <hr>
      <div class = "table-notes">{{ showTableNotes() }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { type ScheduleRow } from "@/utils/get_schedule";
import { defineComponent, ref } from "vue";
const stationName: string[] = [
  /* 各駅の駅番号(CA**の**の部分)をindexとする */
  "　　"/*熱海*/,"函南","三島","沼津","片浜","原","東田子の浦","吉原","富士","富士川","新蒲原","蒲原","由比","興津","清水","草薙","東静岡",
  "静岡","安倍川","用宗","焼津","西焼津","藤枝","六合","島田","金谷","菊川","掛川","愛野","袋井","御厨","磐田","豊田町","天竜川",
  "　　"/*浜松*/,"高塚","舞阪","弁天島","新居町","鷲津","新所原","二川","豊橋"
];
function GetStationName(index: number): String{
  if(index < 0 || index >= stationName.length){
    return "不明";
  }
  return stationName[index];
}
export default defineComponent({
  props: ["toC", "schedule"],
  setup() {
    const 
      scheduleJRUDisplayStyleRef = ref(0),/*2026.05 追加 0: 先発又は乗り換え時間内に発車する電車のみ表示 1:それより後の、次のバスが到着するまでの全ての電車を表示する*/
      scheduleJRDDisplayStyleRef = ref(0);/*2026.05 追加 0: 先発又は乗り換え時間内に発車する電車のみ表示 1:それより後の、次のバスが到着するまでの全ての電車を表示する*/
    return {
      schedule_jr_u_display_style: scheduleJRUDisplayStyleRef,
      schedule_jr_d_display_style: scheduleJRDDisplayStyleRef,
      /*前の行と時間(HH)が同じかどうか*/
      checkShowHH(i: number, rows: ScheduleRow[]) {
        return i == 0 || rows[i - 1].HH != rows[i].HH;
      },
      /*2026.03 追加*/
      getShowType(row: ScheduleRow) {
        if(0 <= row.mm && row.mm <= 60){/*通常の時刻データ*/
          return 'normal';
        }else if(100 <= row.mm && row.mm <= 160){/*ピストン運行*/
          return 'piston';
        }
        return 'undefined';
      },
      /*2025.11 追加*/
      /*出発時刻を表示、0埋めしない*/
      showDepartureTime(row: ScheduleRow, base: number = 0) {
        let returnText: string = "";
        returnText += String(row.mm - base);
        return returnText;
      },
      /*2025.11 追加*/
      /*到着時刻を表示、時間(h)をまたぐ場合は時間も表示*/
      showArrivalTime(row: ScheduleRow) {
        let returnText: string = "";
        let arrival_mm = row.arrival_mm;
        if(arrival_mm >= 60){/*13:03を12:63と表記することにも対応(ピストン運行用のデータで60分間以上の際こちらで対応)*/
          if(row.mm < 100){
            /*なにもしない(通常運行時)*/
          }else if(row.mm < 200){
            /*ピストン運行時*/
            arrival_mm += row.mm % 100;
          }
          let additionalHours: number = 0;
          do{
            additionalHours++;
            arrival_mm -= 60;
          }while(arrival_mm >= 60);
          returnText += String(row.HH+additionalHours) + ":"
          if (arrival_mm < 10) {
            returnText += "0";
          }
          returnText += String(arrival_mm);
          
        }else if (row.mm > row.arrival_mm) {/*:59発:05着などの場合*/
          returnText += String(row.HH+1) + ":"
          /*0分を跨ぐ時だけ1桁分に0をつける*/
          if (row.arrival_mm < 10) {
            returnText += "0";
          }
          returnText += String(row.arrival_mm);
        }else{
          returnText += String(row.arrival_mm);
        }
        return returnText;
      },
      /*2026.03 追加*/
      getDepartureScheduleRow(row: ScheduleRow, mmBase: number = 0){
        const newRow: ScheduleRow = {
          HH: row.HH,
          mm: row.mm - mmBase,
          arrival_mm: row.mm - mmBase};
        return newRow;
      },
      /*2025.11 追加 26.05拡張*/
      /*バス到着時刻以降に出発するJR線の電車と行き先を返す*/
      showNextJR(rowArrayBus: ScheduleRow[], busIndex: number/*-1なら始発前とする*/, rowArrayJR: ScheduleRow[], transferTimeMustAfter: number/*最小乗り換え所要時間*/,
      fUpperLine: boolean, displayStyle: number/*次のバス到着までの全ての電車を表示するならfalse*/) {
        let nextTrain: string = "";
        let returnText: string = "";
        /*rowArrayBus[busIndex+1]が常にあるとは限らないのでそれとは別に使う要素だけ抜き取った配列を用意する*/
        let nullStartBus: ScheduleRow = {
          HH: 3,
          mm: 59,
          arrival_mm: 0,
        };
        let nullLastBus: ScheduleRow = {
          HH: 24 + nullStartBus.HH/*終電よりあとにする必要があるため適当に100時に*/,
          mm: nullStartBus.arrival_mm,
          arrival_mm: nullStartBus.arrival_mm+1,/*適当な数ですが0より大、60より小である必要があります*/
        };
        let arrivalRows: ScheduleRow[] = [(busIndex < 0) ? {...nullStartBus} : {...rowArrayBus[busIndex]}, (busIndex+1 < rowArrayBus.length) ? {...rowArrayBus[busIndex+1]} : {...nullLastBus}];
        for(let i = 0; i < arrivalRows.length; i++){
          if(arrivalRows[i].arrival_mm >= 60){/*arrival_mmを「分間」として使うとき*/
            let additionalHours = 0;
            do{
              additionalHours++;
              arrivalRows[i].arrival_mm -= 60;
            }while(arrivalRows[i].arrival_mm >= 60);
            arrivalRows[i].HH += additionalHours;
          }else if(arrivalRows[i].mm > arrivalRows[i].arrival_mm){/*rowBus.HHは出発時刻の時間hだがこれは到着時刻の時間h*/
            arrivalRows[i].HH++;
          }
        }
        // returnText += String(arrivalRows[1].HH) + ":" + String(arrivalRows[1].mm);
        let passedTrainCount: number = 0;/*駅についてから通過した電車の数*/
        for (let i = 0, transferTime = 0/*乗り換え所要時間*/; i < rowArrayJR.length; i++){
          if(rowArrayJR[i].HH < arrivalRows[1].HH || (rowArrayJR[i].HH == arrivalRows[1].HH && rowArrayJR[i].mm < arrivalRows[1].arrival_mm)){
            if (arrivalRows[0].HH < rowArrayJR[i].HH || (arrivalRows[0].HH == rowArrayJR[i].HH && arrivalRows[0].arrival_mm <= rowArrayJR[i].mm)){
              /*乗り換え時間を計算*/
              if(arrivalRows[0].HH < rowArrayJR[i].HH){
                transferTime += 60;
              }
              transferTime += rowArrayJR[i].mm - arrivalRows[0].arrival_mm;
              /*nextTrainに次の列車の時刻(と行き先)を書き込み*/
              nextTrain = "";
              /*全ての電車を表示する場合始発前と終バスのところだけ時刻部分を付加*/
              if(1 || (displayStyle == 1 && (busIndex == -1 || busIndex+1 >= rowArrayBus.length))){
                nextTrain = String(rowArrayJR[i].HH) + ":";
              }
              /*0詰め*/
              if (rowArrayJR[i].mm < 10) {
                nextTrain += "0";
              }
              if (fUpperLine) {/*上り線*/
                nextTrain += String(rowArrayJR[i].mm) + " " + GetStationName(rowArrayJR[i].arrival_mm);
              }else{/*下り線*/
                nextTrain = `${GetStationName(rowArrayJR[i].arrival_mm)}${" "}${nextTrain}${String(rowArrayJR[i].mm)}`;
              }
              /*returnTextの最後に追加*/
              returnText += nextTrain;
              /*displayStyleで、乗り換え時間が最小乗り換え時間より短い場合、恐らく乗れないため表示はするが後発も表示する(breakしない)*/
              if(displayStyle == 0 && transferTime >= transferTimeMustAfter){
                break;
              }
              returnText += "\n";
              
              passedTrainCount++;
            }
          }else{
            /*次のバスが到着した以降に来る電車は次のバスと同じ行に表示するのでbreak*/
            break;
          }
        }
        return returnText;
      },
      /*2025.11 追加*/
      /*注釈*/
      showTableNotes() {
        return String("バス・JR線のいずれも遅延等に対応していません。\nJR線の行き先はは無印: 上り/熱海、下り/浜松 行きです。\n\
「JR」は、JRグループ各社の登録商標です。");
      },

      /*2026.05 追加 JR線の一部/全部のプルダウン*/
      onChangeJRDScheduleDisplayStyle(event: Event) {
        const select = event.target as HTMLSelectElement;
        switch(select.value){
          default:
          case "part":
            scheduleJRDDisplayStyleRef.value = 0;
            break;
          case "all":
            scheduleJRDDisplayStyleRef.value = 1;
            break;
        }
      },
      onChangeJRUScheduleDisplayStyle(event: Event) {
        const select = event.target as HTMLSelectElement;
        switch(select.value){
          default:
          case "part":
            scheduleJRUDisplayStyleRef.value = 0;
            break;
          case "all":
            scheduleJRUDisplayStyleRef.value = 1;
            break;
        }
      },
    };
  },
});
</script>
