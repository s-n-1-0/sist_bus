<template>
  <div>
    <div class="text-center">
      <a
        class="introvert2"
        href="https://forms.office.com/Pages/ResponsePage.aspx?id=Bb0r1yPrmEGObOE4I--qiDTo6qug1SlGruWNB4fcjXxUNElKS1BBMU9WRUpQV1RPM0lGNzU5QzNKQS4u"
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
          <tr v-for="(row, i) in schedule.schedule_bus_c" :key="row">
            <td>
              <b v-if="checkShowHH(i, schedule.schedule_bus_c)">{{ row.HH }}時</b>
            </td>
            <td>{{ showDepartureTime(row) }}</td>
            <td>→</td>
            <td>{{ showArrivalTime(row) }}</td>
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
            <th>　大学発　</th>
            <th></th>
            <th>　愛野駅着　</th>
            <th>JR下り</th>
            <th>JR上り</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in schedule.schedule_bus_a" :key="row">
            <td>
              <b v-if="checkShowHH(i, schedule.schedule_bus_a)">{{ row.HH }}時</b>
            </td>
            <td>{{ showDepartureTime(row) }}</td>
            <td>→</td>
            <td>{{ showArrivalTime(row) }}</td>
            <td>{{ showNextJR(row, schedule.schedule_jr_d, schedule.defTransferTimeMust, false) }}</td>
            <td>{{ showNextJR(row, schedule.schedule_jr_u, schedule.defTransferTimeMust, true) }}</td>
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
import { defineComponent } from "vue";
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
    return {
      /*前の行と時間(HH)が同じかどうか*/
      checkShowHH(i: number, rows: ScheduleRow[]) {
        return i == 0 || rows[i - 1].HH != rows[i].HH;
      },
      /*2025.11 追加*/
      /*出発時刻を表示、0埋めしない*/
      showDepartureTime(row: ScheduleRow) {
        let returnText: string = "";
        returnText += String(row.mm);
        return returnText;
      },
      /*2025.11 追加*/
      /*到着時刻を表示、時間(h)をまたぐ場合は時間も表示*/
      showArrivalTime(row: ScheduleRow) {
        let returnText: string = "";
        if (row.mm > row.arrival_mm) {
          returnText += String(row.HH+1) + ":"
          /*0分を跨ぐ時だけ1桁分に0をつける*/
          if (row.arrival_mm < 10) {
            returnText += "0";
          }
        }
        returnText += String(row.arrival_mm);
        return returnText;
      },
      /*2025.11 追加*/
      /*バス到着時刻以降に出発するJR線の電車と行き先を返す*/
      showNextJR(rowBus: ScheduleRow, rowArrayJR: ScheduleRow[], transferTimeMust: number/*最小乗り換え所要時間*/, fUpperLine: boolean) {
        let nextTrain: string = "";
        let returnText: string = "";
        for (let i = 0, transferTime = 0/*乗り換え所要時間*/; i < rowArrayJR.length; i++){
          if (rowBus.HH < rowArrayJR[i].HH || (rowBus.HH == rowArrayJR[i].HH && (rowBus.arrival_mm) < rowArrayJR[i].mm)){
            /*乗り換え時間を計算*/
            if(rowBus.HH < rowArrayJR[i].HH){
              transferTime += 60;
            }
            transferTime += rowArrayJR[i].mm - rowBus.arrival_mm;
            /*nextTrainに次の列車の時刻(と行き先)を書き込み*/
            nextTrain = "";
            if (rowArrayJR[i].mm < 10) {
              nextTrain += " 0"; //0詰め
            }
            if (fUpperLine) {/*上り線*/
              nextTrain = nextTrain + String(rowArrayJR[i].mm) + " " + GetStationName(rowArrayJR[i].arrival_mm);
            }else{/*下り線*/
              nextTrain = GetStationName(rowArrayJR[i].arrival_mm) + " " + nextTrain + String(rowArrayJR[i].mm);
            }
            /*returnTextの最後に追加*/
            returnText += nextTrain;
            /*乗り換え時間が最小乗り換え時間より短い場合、恐らく乗れないため表示はするが後発も表示する(breakしない)*/
            if(transferTime >= transferTimeMust){
              break;
            }
            returnText += "\n";
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
    };
  },
});
</script>
