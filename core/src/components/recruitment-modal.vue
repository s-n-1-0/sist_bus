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
          現在本サイトの管理メンバーを募集しています。<br />
          バス時刻の更新などをしますが、基本ブラウザ操作なので簡単です。もし興味がございましたら下記リンクへ連絡ください。<br />
          週数百ユーザーが利用しているのでたぶん就活とかに書けるかもしれません。<br />
          <br />
          ちなみに管理にプログラミング知識は不要です。<br />
          (もちろん知識があったらサイトを好きにいじれます)<br />
          <br />
          <h3>募集条件や仕事内容</h3>
          <ul>
            <li>募集 : 2年生以下(学部学科問わない)</li>
            <li>仕事内容 : 月初めにバスサイトの更新(5分程度のコピペ)</li>
            <ul>
              <li style="list-style: circle">
                長い間更新作業が行われていない場合、サイトが閉鎖される可能性があります。
              </li>
            </ul>
          </ul>
          <br />
          <h3>備考</h3>
          <ul>
            <li>プログラミング知識不要(あるとサイトを好きにいじれます)</li>
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
          twemoji.parse(rModalRef.value);
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
