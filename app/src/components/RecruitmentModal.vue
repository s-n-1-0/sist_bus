<template>
  <div
    ref="rModal"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">🚌バスツール運営募集</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body text-start">
          <h4>現在本バスサイトの管理人を募集しています。</h4>
          <br />
          プログラミングができなくても大丈夫です。週数百人が利用しているのでたぶん就活とかに書けるかもしれません。<br />
          もちろん学習意欲があれば、本サイトを通してGitやWeb開発の基礎などを学ぶことができます。<br />
          <div class="my-2 alert alert-info text-center">
            現在のメンバー :

            <a class="user-icon" href="https://github.com/026KANAYAMA"
              ><img
                class="rounded"
                src="https://github.com/026KANAYAMA.png" /></a
            ><small class="ms-1">(管理人)</small> ・
            <a class="user-icon" href="https://github.com/s-n-1-0"
              ><img class="rounded" src="https://github.com/s-n-1-0.png" /></a
            ><small class="ms-1">(サポート)</small>
          </div>
          <h3>募集条件や内容</h3>
          <ul>
            <li>
              条件 :
              応募時点で理工科大学に2年以上通う必要がある人(学部学科問わない)
            </li>
            <li>
              やること : 月初めにバスサイトの更新(月1で5分程度)<br />
              いきなり全てを任せることはしないのでご安心ください。
            </li>
          </ul>

          <br />
          <hr />
          <h3>📧連絡先</h3>
          興味があれば
          <a href="https://forms.gle/b9VFcBePbxHVLJEu7">ここのフォーム</a
          >にお願いします。<br />
          <br />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
//@ts-ignore
import twemoji from "twemoji";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const rModalRef = ref(null);
    return {
      rModal: rModalRef,
      showModal() {
        if (rModalRef.value != null) {
          twemoji.parse(rModalRef.value, {
            base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/",
          }); //@ts-ignore
          var modal = new bootstrap.Modal(rModalRef.value, {});
          modal.show();
        }
      },
    };
  },
});
</script>
<style scoped>
li {
  list-style: disc;
}
</style>
