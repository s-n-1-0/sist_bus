<template>
  <div class="announce">
    <p class="mb-0 pb-0">
      <b>アナウンス(11/03)</b>
    </p>
    <div>
      <p class="mb-2">11月更新しました。</p>
      本サイトは4周年を迎えました🎉<br />
      今後もサービスを提供し続けるために、手伝っていただける方を<span
        v-on:click="showModal"
        class="site_color_text"
        ><u>募集しています。</u></span
      >
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
