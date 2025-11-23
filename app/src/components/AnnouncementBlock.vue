<template>
  <div class="announce">
    <p class="mb-0 pb-0">
      <b>アナウンス(11/24)</b>
    </p>
    <div class="px-2">
      <p class="mb-2">
        JR線の一部列車の時刻表の掲載を開始いたしました。遅延等には未対応です。<br />
        試験期間は時刻を表示しません。↑のPDFから時刻を確認してください。
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
