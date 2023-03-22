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
            <td>
              <b>{{ row.dd }}日</b>
            </td>
            <td>{{ makeComment(row) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { ScheduleEx } from "utils/get_schedule";
import { defineComponent } from "vue";
export default defineComponent({
  props: ["schedule"],
  methods: {
    makeComment: (ex: ScheduleEx) => {
      let comment = "";
      switch (ex.exception) {
        case -2:
          comment = "運休"; //確実に運休の場合
          break;
        case -1:
          comment = "意図的なデータ未入力(PDF見てください)";
          break;
        case 0:
          comment = "通常運転(本来は運休)";
          break;
        default:
          comment = "変則運転";
          break;
      }
      return comment;
    },
  },
});
</script>
