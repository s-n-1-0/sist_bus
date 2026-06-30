<template>
  <div class="announce">
    <p class="mb-0 pb-0">
      <b>アナウンス(6/30)</b>
    </p>
    <div class="px-2">
      <p class="mb-2">
        7月分の時刻表が未発表のため引き続き6月分の時刻を表示しています。<br />
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
