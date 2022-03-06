Vue.component('schedule-irregular',{
  props:['schedule'],
template:`
<div class="text-center">
<b>変則運転予定表(原則土日を除く)</b>
<div>
  <table>
  <thead>
    <tr>
    <th>日にち</th>
    <th>対応</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="row in schedule.schedule_ex">
        <td><b>{{row.dd}}日</b></td>
        <td>{{row.comment}}</td>
      </tr>
    </tbody>
  </table>
</div>
</div>`
})
Vue.component('schedule-times',{
props:['toC','schedule'],
template:`
<div>
<div class="text-center">
<a class="introvert2" href="https://forms.office.com/Pages/ResponsePage.aspx?id=Bb0r1yPrmEGObOE4I--qiDTo6qug1SlGruWNB4fcjXxUNElKS1BBMU9WRUpQV1RPM0lGNzU5QzNKQS4u">時刻表示ミスがある場合の報告</a><br>
</div>
<div v-if="toC">
  <table>
    <thead>
      <tr>
        <th>時刻</th>
        <th>駅発</th>
        <th>大学着</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in schedule.schedule_c">
        <td><b v-if="row.isShowHH">{{row.HH}}時</b></td>
        <td>{{row.mm}}</td>
        <td>{{row.arrival_mm}}</td>
      </tr>
    </tbody>
  </table>
</div>
<div v-else="toC">
  <table>
    <thead>
      <tr>
        <th>時刻</th>
        <th>大学発</th>
        <th>駅着</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in schedule.schedule_a">
        <td><b v-if="row.isShowHH">{{row.HH}}時</b></td>
        <td>{{row.mm}}</td>
        <td>{{row.arrival_mm}}</td>
      </tr>
    </tbody>
  </table>
</div></div>`
});