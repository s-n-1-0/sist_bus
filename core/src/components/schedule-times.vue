<template>
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
      <tr v-for="row in schedule.schedule_c" :key="row">
        <td><b v-if="row.isShowHH">{{row.HH}}時</b></td>
        <td>{{row.mm}}</td>
        <td>{{row.arrival_mm}}</td>
      </tr>
    </tbody>
  </table>
</div>
<div v-else>
  <table>
    <thead>
      <tr>
        <th>時刻</th>
        <th>大学発</th>
        <th>駅着</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in schedule.schedule_a" :key="row">
        <td><b v-if="row.isShowHH">{{row.HH}}時</b></td>
        <td>{{row.mm}}</td>
        <td>{{row.arrival_mm}}</td>
      </tr>
    </tbody>
  </table>
</div></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props:['toC','schedule'],
    setup() {
        
    },
})
</script>
