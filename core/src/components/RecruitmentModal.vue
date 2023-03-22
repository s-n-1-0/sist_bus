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
          <p class="mb-2 alert alert-info text-center">
            現在のメンバー :

            <a class="user-icon" href="https://github.com/026KANAYAMA"
              ><img
                class="rounded"
                src="https://github.com/026KANAYAMA.png" /></a
            ><small class="ms-1">(新管理)</small> ・
            <a class="user-icon" href="https://github.com/s-n-1-0"
              ><img class="rounded" src="https://github.com/s-n-1-0.png" /></a
            ><small class="ms-1">(サポート)</small>
          </p>
          現在本サイトの管理メンバーを募集しています。<br />
          バス時刻の更新をしますが、基本ブラウザ操作なので簡単です。もし興味がございましたら下記リンクへ連絡ください。<br />
          週数百ユーザーが利用しているのでたぶん就活とかに書けるかもしれません。<br />
          <br />
          ちなみに管理にプログラミング知識は不要です。<br />
          (もちろん知識があったらサイトを好きにいじれます。GitやWeb開発の知識も獲得できます)<br />
          <br />
          <h3>募集条件や内容</h3>
          <ul>
            <li>募集 : 2年生以下(学部学科問わない)</li>
            <li>内容 : 月初めにバスサイトの更新(5分程度のコピペ)</li>
          </ul>
          <br />
          <h3>備考</h3>
          <ul>
            <li>
              プログラミング知識<b>不要</b>(あるとサイトを好きにいじれます)
            </li>
            <li>Googleアカウント必須</li>
            <li>GitHubアカウント必須 (GitHubがわからない方は説明します)</li>
          </ul>
          <br />
          <hr />
          <h3>📧連絡先</h3>
          <a href="https://forms.office.com/r/E5p7tNmeic">ここのフォーム</a
          >にお願いします。<br />
          ※大学用Microsoftアカウント以外はアクセスできません。
          <br />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import twemoji from "twemoji";
export default defineComponent({
  setup() {
    const rModalRef = ref(null);
    return {
      rModal: rModalRef,
      showModal() {
        if (rModalRef.value != null) {
          twemoji.parse(rModalRef.value, {
            base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/",
          });
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
