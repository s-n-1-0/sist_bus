<template>
  <div class="announce">
    <p class="mb-0 pb-0">
      <b>アナウンス(4/2)</b>
    </p>
    <div class="px-2">
      <p class="mb-2">ご入学おめでとうございます。4月更新しました。<br /></p>
      本サイトは4周年を迎えました🎉<br />
      運営者の卒業に伴い、新たにサイトを盛り上げてくれる後任の運営者を<span
        v-on:click="showModal"
        class="site_color_text"
        ><u>募集</u></span
      >しています！
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
