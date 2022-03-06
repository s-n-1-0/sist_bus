<template>
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
      <tr v-for="row in schedule.schedule_ex" :key="row">
        <td><b>{{row.dd}}日</b></td>
        <td>{{row.comment}}</td>
      </tr>
    </tbody>
  </table>
</div>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props:['schedule']
})
</script>
