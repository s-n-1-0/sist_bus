<template>
  <div class="container">
  <h1>【過去データ】<span>{{yyyy}}年の</span>バス時刻</h1>
  <a href="../">リアルタイム時刻表はこちら</a><br>
    <div v-if="isGetListData !== null">
        <div v-if="isGetListData === true">
        このページでは{{yyyy}}年の以下の月の予定のみ表示可能です。<br>
        <div id="contents" class="list-group">
          <div v-for="MM in title" :key="MM" class="list-group-item cur-ptr" @click="dropdown(MM)">
            <span class ="dropdown-head" v-bind:class="{active:selectedMM===MM}"><u>{{MM}}月</u></span>
            <div v-if="selectedMM===MM">
              <div style="padding: 10px;">
               <div>
                <schedule-irregular :schedule="selectedSchedule"></schedule-irregular>
                <hr/>
                <div class="text-center">
                    <div class="tabs">
                      <input type="radio" id="tab1" name="tab" value="true"  v-model="isCorS" v-on:change="onChange(true)">
                      <label for="tab1">大学行</label>
                      <input type="radio" id="tab2" name="tab" value="false"   v-model="isCorS"
                      v-on:change="onChange(false)">
                      <label for="tab2">駅行</label>
                    </div></div>
                  <schedule-times :to-c="isCorS" :schedule="selectedSchedule"></schedule-times>
                </div>
                </div>
              </div>
            </div>
        </div>
        </div>
        <span v-else>表示できるデータはありません。</span>
    </div>
    <span v-else>過去データ取得中...</span>
  <footer >
    <hr/> 
    <div class="announce" style="padding: 10px">
    <a id="yome">注意</a>
    <br/> 作成者個人用の時刻確認ページです。静岡理工科大学公式ではありません。表示時間にバスが来なくて遅刻・欠席が発生しても責任は取れません。
    <br> 現在時刻は現地時間を元にしています。
    <br> 作成者に関係の無い予定は表示されない場合があります。
    <hr/>
    <b>2020年の変則運転予定表</b>は、「運休」の項目がないため運休の場合も「意図的なデータ未入力(PDF見てください)」が表示されます。
  </div>
  <br>
  <a href="./2021" style=" float: right;">2021年の過去データはこちら</a><br>
</footer>
</div>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue'
import {useRoute} from 'vue-router';
import {getScheduleEx,getSchedule,schedule2ScheduleUI,getYearList} from "../get_schedule";
import scheduleIrregularComponent from "../components/schedule-irregular.vue";
import scheduleTimesComponent from "../components/schedule-times.vue";
   
export default defineComponent({
    setup() {
        const route = useRoute();
        const _yyyy = Number(route.params?.yyyy ?? "");
        let yyyy = isNaN(_yyyy) ? 2000 : _yyyy;
        getYearList().then(data=>{
            let list = data.yyyy;
           if (list?.[`${yyyy}`]){
               titleRef.value = list[yyyy].map(item=>`${item}`);
               schedulesRef.value = Array(titleRef.value.length);
               isGetListDataRef.value = true;
           }else{
               //データがありません
               isGetListDataRef.value = false;
           }
        });
        let titleRef = ref([]);
        const schedulesRef = ref(Array(titleRef.value.length)),
            isCorSRef = ref(true),
            isGetListDataRef = ref(null),
            selectedScheduleRef = ref(null),
            selectedMMRef = ref("");
      return{
            yyyy:yyyy,
  	        title:titleRef,
            selectedSchedule:selectedScheduleRef,
            schedules:schedulesRef,//月数を指定
            isCorS:isCorSRef,
            isGetListData:isGetListDataRef,// null = 未確認 false = 失敗  true= 成功
            selectedMM:selectedMMRef,
            dropdown(MM){
            let i = titleRef.value.indexOf(MM)
            if (schedulesRef.value[i] === undefined){
            getScheduleEx(yyyy, MM, function(schedule) {
            schedulesRef.value[i] = {}
            schedulesRef.value[i].schedule_ex = schedule;
                //ex内部で実行(非同期後)
                getSchedule(yyyy, MM,function(pm, schedule) {
                    if (schedule != null) {
                        //読み込み後
                        var mode = pm;
                        schedulesRef.value[i].schedule_c =  schedule2ScheduleUI(schedule["a2c"]);
                        schedulesRef.value[i].schedule_a = schedule2ScheduleUI(schedule["c2a"]);
            //console.log(mode)
            if (mode != -1){
            selectedScheduleRef.value = schedulesRef.value[i];
            selectedMMRef.value = selectedMMRef.value ===MM ? "":MM;
            }
                    }
                },0);
            });
                }else{
                //console.log("読み込み済みのデータを表示");
                selectedScheduleRef.value = schedulesRef.value[i];
                selectedMMRef.value = selectedMMRef.value===MM ? "":MM;
            }
            },
            onChange(iscs) { // クリックイベントでイベント発火
                isCorSRef.value = iscs;
                        }
        } 
    },
    components:{
        "schedule-irregular":scheduleIrregularComponent,
        "schedule-times":scheduleTimesComponent
    }
})
</script>
<style scoped>
.cur-ptr{
  cursor: pointer;
}
</style>
