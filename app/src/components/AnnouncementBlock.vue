<template>
  <div class="announce">
    <p class="mb-0 pb-0">
      <b>アナウンス(5/1)</b>
    </p>
    <div class="px-2">
      <p class="mb-2">
        5月更新しました。<br />
        今回の更新から新しい管理メンバーが参加しました🎉<br />
        <a class="user-icon" href="https://github.com/2x255"
          ><img class="rounded" src="https://github.com/2x255.png"
        /></a>
        <a class="user-icon" href="https://github.com/TAKESHIMA723"
          ><img class="rounded" src="https://github.com/TAKESHIMA723.png"
        /></a>
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
