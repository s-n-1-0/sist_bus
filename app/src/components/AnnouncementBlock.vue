<template>
  <div class="announce">
    <p class="mb-0 pb-0">
      <b>アナウンス(2/5)</b>
    </p>
    <div>
      <p class="mb-2">
        2月更新しました。<br>
      </p>
      本サイトは4周年を迎えました🎉<br />
      今後もサービスを提供し続けるために、手伝っていただける方を<span
        v-on:click="showModal"
        class="site_color_text"
        ><u>募集</u></span
      >しています。
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
