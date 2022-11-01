<template>
	<div class="root container">
		<br>
		<div class="row">
		<div class="col-auto hey">
		<a href="https://www.sist.ac.jp/assets/schoolbus.pdf">バス時刻表PDF</a>
		</div>
		<div class="col-auto hey hey-border cur-ptr">
		<a class="site_color_text" v-on:click="showModal()">管理メンバー募集中</a>
		</div>
		<!--<div class="col-auto hey">
		<a href="https://z-umon.net/space/id/3COWcRHTb3lYsBInbB8o">C言語テスト支援</a>
		</div>-->
		</div>
		<br>
		<h1 class="h3">現在のSISTバス時刻</h1>
		<div class="announce"><p class="mb-0 pb-0"><b>{{announceTitle}}</b></p>
			<div v-html="announceContnt"></div>
		</div>
		<br>
		<div v-show="!isSleep">
			<div>
				<div class="tabs">
					<input type="radio" id="tab1" name="tab" value="1" v-model="isActive" v-on:change="onChange">
					<label for="tab1">🏫大学行</label>
					<input type="radio" id="tab2" name="tab" value="2" v-model="isActive"
					v-on:change="onChange">
					<label for="tab2">🚉駅行</label>
				</div>
			</div>
			<div class="introvert2">{{nowTitle}}</div>
            <div>
			<div class="circle_root">
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<g>
						<circle id="circle" class="timer-circle" r="40" cy="51" cx="51" stroke-width="8"
						stroke="#7d2927" fill="#eaf4fc" :style="{'stroke-dashoffset':strokeDashoffset}"/>
					</g>
				</svg>
				<div class="circle_text">
					<div class="introvert" v-if="isActive === '1'">大学行 </div>
					<div class="introvert" v-else-if="isActive === '2'">駅行</div>
					<div>{{nextTimeTitle}}</div>
					<div>{{timerTitle}}</div> <a v-on:click="tapedDisclaimer()"  class="introvert cur-ptr" style="color: black;"><u>注意(免責事項)</u></a>					</div>
			</div>
            </div>
			<div>{{modeTitle}}</div><hr>
			<div >{{modeSubTitle}}</div>
			<schedule-times :to-c="isActive === '1'" :schedule="{schedule_a,schedule_c}"></schedule-times>
		</div>
		<div v-show="isSleep" style="display: none; ">
			<div style="display:inline-block; text-align: left;">
			<b>時刻表データが入力されていないか運休です。</b>
			<br> 【理由】
			<br> ・運休の場合(土日など)
			<br> ・試験期間の場合(変則運転の場合があります)
			<br> ・時刻表データが入力されていない場合
			<br> 大学が公開しているPDFで時刻を確認してください。
			</div>
		</div>
		<hr>
		<schedule-irregular :schedule="{schedule_ex}"></schedule-irregular>
		<hr/>
		愛野駅の電車時刻表は<a href="https://ekitan.com/timetable/railway/line-station/149-147/d1">こちら(駅探)</a>
		<hr />
		<footer style="text-align: left;">
			<div class="announce" style="padding: 10px">
			<a id="yome">❕注意</a>
			<br/> 作成者個人用の時刻確認ページです。静岡理工科大学公式ではありません。表示時間にバスが来なくて遅刻・欠席が発生しても責任は取れません。
			<br> 作成者に関係の無い予定は表示されない場合があります。
			<br>
            <router-link to="/archive" style=" float: right;">過去の時刻表はこちら</router-link><br>
			</div>
		</footer>
        <recruitment-modal ref="rModal"></recruitment-modal>
    </div>
</template>
<script lang="ts">
import { defineComponent,ref,onMounted } from 'vue';
import twemoji from "twemoji";
import {getScheduleEx,checkAndGetSchedule,schedule2ScheduleUI} from "../get_schedule";
import scheduleIrregularComponent from "../components/schedule-irregular.vue";
import scheduleTimesComponent from "../components/schedule-times.vue";
import recruitmentModal from "../components/recruitment-modal.vue";
export default defineComponent({
    setup() {
        onMounted(()=>{
           twemoji?.parse(document.body);
        })
        const isActiveRef =  ref('1'),
            isSleepRef = ref(false),
            scheduleCRef = ref([]),
			scheduleARef = ref([]),
            scheduleExRef = ref([]),
            nextTimeTitleRef = ref("取得中"),
            timerTitleRef = ref(""),
            nowTitleRef = ref(""),
            modeTitleRef = ref(""),
            modeSubTitleRef = ref(""),
            strokeDashoffsetRef = ref(0),
            rModalRef = ref(null);
        const update = ()=>{ //isActiveを切り替えることで再描画される。
				isActiveRef.value = ''; //一度他の値に書き換えて再描画をさせる
				isActiveRef.value = '1';
			}
            	var nd = new Date();
	var mode = -1;
	let yyyy = nd.getFullYear();
	let MM = nd.getMonth() + 1;
	let dd = nd.getDate();
	// dd = 1;
	let day_idx = nd.getDay();
	let comment = "";
	var next = null;
	var next_end = null;
	var next_interval = 0;
    var now = new Date();
    nowTitleRef.value = "アクセス時刻:" + now.toLocaleString('ja-JP') + "";
    getScheduleEx(yyyy, MM).then((scheduleEx)=>{
                //console.log(JSON.stringify(schedule_ex));
        scheduleExRef.value = scheduleEx;
        //ex内部で実行(非同期後)
        checkAndGetSchedule(yyyy, MM, dd, day_idx, scheduleEx).then((result)=>{
            const {mode:pm, schedule} = result;
            if (schedule != null) {
                //読み込み後
                mode = pm;
                modeSubTitleRef.value = (mode == 0) ? "" : "バス到着時間が通常運転とは異なる場合があります";
                scheduleCRef.value = schedule2ScheduleUI(schedule.a2c);
                scheduleARef.value = schedule2ScheduleUI(schedule.c2a);

            } else {
                isSleepRef.value = true;
            }
            update(); //大学行きを初期画面とする。
            modeTitleRef.value = "本日(" + (String(yyyy) + "/" + String(MM) + "/" +
                String(dd)) + ")" + ((mode == 0) ? "通常運転です" : "変則運転です");
        })
    });
        var initialOffset = 280;
        var i = 0; //デバッグよう
        setInterval(function() {
            if (mode == -1) return;
            var now = new Date();
            //now = new Date(yyyy,MM,dd,0,11); //デバッグよう
            //now.setMinutes(now.getMinutes() + i); //デバッグよう
            i++;
            if (next == null || next < now) {
                strokeDashoffsetRef.value = 280;
                if (next != null) timerTitleRef.value = "出発"; //初期表示を防ぐ
                let schedule = (isActiveRef.value == '1') ? scheduleCRef.value : scheduleARef.value;
                let bemybaby = []
                for (let key in schedule) {
                    var baby = schedule[key];

                    if (Number(baby.HH) > now.getHours() || (Number(baby.HH) == now.getHours() &&
                            Number(baby.mm) > now.getMinutes())) {
                        bemybaby.push(baby);
                    }
                }
                if (bemybaby.length == 0) { //本日は終了
                    nextTimeTitleRef.value = "次|無し";
                    timerTitleRef.value = "終了";
                } else {
                    var min_date = null;
                    var min_end_date = null;
                    var min_sa = Number.MAX_SAFE_INTEGER; //max86400000 (=1日)
                    for (let key in bemybaby) {
                        var baby = bemybaby[key];
                        var d = new Date(yyyy, MM - 1, dd, Number(baby.HH), Number(baby.mm));
                        var ll = d.getTime() - now.getTime();
                        //console.log(baby);
                        if (min_sa > ll) {
                            min_sa = ll;
                            min_date = d;
                            min_end_date = new Date(yyyy, MM - 1, dd, Number(baby.HH), Number(baby.arrival_mm));
                            if (min_date > min_end_date) { //到着時間の方が小さくなるケース (yyyy,MM,dd,5,55) > (yyyy,MM,dd,5,1) <-右側は時間がカウントされている
                                min_end_date = new Date(yyyy, MM - 1, dd, Number(baby.HH) + 1, Number(
                                    baby.arrival_mm));
                            }
                        }
                    }
                    next = min_date;
                    next_interval = (next.getTime() - now.getTime()) / 1000; //現在と次のバスが来るまでの時間差
                }
            } else {
                let ll = (next.getTime() - now.getTime()) / 1000; //次が「来るまで」の時間(s)
                nextTimeTitleRef.value = "次|" + String(next.getHours()) + ":" + String(next.getMinutes());
                timerTitleRef.value = "あと" + ((ll / 60 > 0) ? String(Math.floor(ll / 60)) +
                    "分" : "") + String(Math.floor(ll % 60)) + "秒";
                strokeDashoffsetRef.value = initialOffset - ((
                    next_interval - ll) * (initialOffset / next_interval));
            }
        }, 1000);
        return{
            announceTitle:window.announceTitle,
            announceContnt:window.announceContent,
			isActive: isActiveRef,
            isSleep:isSleepRef,
			schedule_ex: scheduleExRef,
			schedule_c:scheduleCRef,
			schedule_a:scheduleARef,
            nextTimeTitle:nextTimeTitleRef,
            timerTitle:timerTitleRef,
            nowTitle:nowTitleRef,
            modeTitle:modeTitleRef,
            modeSubTitle:modeSubTitleRef,
            strokeDashoffset:strokeDashoffsetRef,
            rModal:rModalRef,
            onChange(event) { // クリックイベントでイベント発火
				next = null;
				next_end = null;
				nextTimeTitleRef.value = "取得中";
			    timerTitleRef.value =	"あと?分";
			},
            tapedDisclaimer(){
                const targetElement = document.getElementById("yome");
                const targetOffsetTop = window.pageYOffset + targetElement.getBoundingClientRect().top;
                window.scrollTo({
                    top: targetOffsetTop,
                    behavior: "smooth"
                });
            },
            showModal(){
                rModalRef.value?.showModal();
            }
		}
    },
    components:{
        "schedule-irregular":scheduleIrregularComponent,
        "schedule-times":scheduleTimesComponent,
        "recruitment-modal":recruitmentModal
    }
})
</script>
<style scoped>
.site_color_text{
   color: #7d2927;
}
/*時刻表示枠全体*/
.circle_root {
    position: relative;
    left: 50%;
    transform: translate(-50%,0%);
    /*background-color: red;*/
    width: 100%;
}
/*園内テキスト*/
.circle_text {
    text-align:center;
    position: absolute;
    line-height: 1.5em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    vertical-align: middle;
    font-size:6vw;
    color: #7d2927;
    /*background-color: blue;*/
}
@media screen and (min-width: 800px){
    .circle_root{
        width: 600px;
    }
    .circle_text {
        font-size:40px;
    }
    .introvert{
        font-size: 24px;
     }
}
/*円向き*/
svg {
    width: inherit;
    height: inherit;
    max-width: inherit;
    max-height: inherit;
   -webkit-transform: rotate(-90deg);
    transform: rotate(-90deg);
}
/*  アニメーションセット  */
.timer-circle {
    stroke-dasharray: 280; 
    stroke-dashoffset: 280;
    transition: all 1s linear;
  }
.root{
  text-align:center;
}
.cur-ptr{
  cursor: pointer;
}
</style>