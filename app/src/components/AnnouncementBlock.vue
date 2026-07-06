<template>
  <div class="announce">
    <p class="mb-0 pb-0">
      <b>アナウンス(7/6)</b>
    </p>
    <div class="px-2">
      <p class="mb-2">
        7月分に更新いたしました。
        試験期間は時刻を表示しません。↑のPDFまたは大学公式HPから時刻を確認してください。
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["showModal"],
  setup: (props) => {
    return { ...props };
  },
});
</script>

<style scoped>
.site_color_text {
  color: #7d2927;
}
</style>
