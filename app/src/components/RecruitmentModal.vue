<template>
  <div
    ref="rModal"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
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
          <h4>バスサイトの運営メンバーを募集中!</h4>
          <p>
            毎週数百人が利用しているバスサイトを一緒に運営しませんか?
          </p>
          <p>
            プログラミングの経験は不要です。
            学習意欲があれば、GitやWeb開発の基礎を実践的に学べる環境です。
            運営経験は就活でもアピールできるポイントになります。
          </p>
          <div class="my-3 d-flex justify-content-center">
          <div class="alert alert-info text-center mb-0">
            現在のメンバー
            <div class="d-flex justify-content-center gap-4 mt-2">
              <div class="member">
                <a class="user-icon" href="https://github.com/2x255"
                  ><img class="rounded" src="https://github.com/2x255.png"
                /></a>
                <small class="d-block">管理人</small>
              </div>
              <div class="member">
                <a class="user-icon" href="https://github.com/TAKESHIMA723"
                  ><img
                    class="rounded"
                    src="https://github.com/TAKESHIMA723.png"
                /></a>
                <small class="d-block">管理人</small>
              </div>
              <div class="member">
                <a class="user-icon" href="https://github.com/026KANAYAMA"
                  ><img
                    class="rounded"
                    src="https://github.com/026KANAYAMA.png"
                /></a>
                <small class="d-block">サポート</small>
              </div>
              <div class="member">
                <a class="user-icon" href="https://github.com/s-n-1-0"
                  ><img class="rounded" src="https://github.com/s-n-1-0.png"
                /></a>
                <small class="d-block">サポート</small>
              </div>
            </div>
          </div>
          </div>
          <h5 class="mt-4">募集条件と内容</h5>
          <ul class="ms-2">
            <li>
              <strong>対象</strong> :
              応募時点で理工科大学に2年以上在籍予定の方（学部・学科不問）
            </li>
            <li>
              <strong>主な作業</strong> : 月初めに時刻表データの更新（月1回・5分程度）
              <p class="mb-1 mt-1">最初は丁寧にサポートするので安心してください。</p>
            </li>
            <li>
              <strong>やってみたい方歓迎</strong> :
              サイトのフロントエンド開発（Vue → React リプレイス、SPA → SSG 移行など）
              <p class="mb-1 mt-1">実際のプロダクト開発に携われるので、就活でのアピール材料にもなります。</p>
            </li>
          </ul>

          <hr class="my-3" />
          <h5>📧連絡先</h5>
          <p>
            少しでも興味があれば、気軽にご連絡ください!
          </p>
          <div class="text-center mb-2">
            <a
              href="https://forms.gle/b9VFcBePbxHVLJEu7"
              class="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >応募フォームはこちら</a>
          </div>
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
.member small {
  font-size: 0.8rem;
}
.member :deep(.user-icon) {
  max-height: 40px;
  max-width: 40px;
}
</style>
