<template>
    <div ref="rModal" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">🚌バスツール管理者募集</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-start">
                バスツールの作成者である私が大学を離れた時点でツールは閉鎖されます。<br>
                ツールの管理は全く難しくないのでもしバスツールが欲しい方いましたら下記リンクへ連絡ください。<br>
                週100人前後が利用しているのでたぶん就活とかの学内貢献枠に書けるかもしれません。<br>
                <br>
                ちなみに管理にプログラミング知識は不要です。<br>
                <br>
                <h3>条件</h3>
                <ul>
                    <li>2年生以下(学部学科問わない)</li>
                    <li>月初めに時刻表の更新作業(5分程度のコピペ)をサボらずできる方</li>
                    <ul>
                        <li style="list-style: circle;">更新作業が数ヶ月行われていない場合、こちらでサイトを閉鎖する場合があります。</li>
                    </ul>
                </ul>
                <br>
                <h3>備考</h3>
                <ul>
                    <li>プログラミング知識不要(あると好きにサイトをいじれます)</li>
                    <li>Googleアカウント必須</li>
                    <li>GitHubアカウント必須(GitHubがわからない方は説明します)</li>
                </ul>
                <br>
                <hr>
                <h3>📧連絡先</h3>
                <a href="https://forms.office.com/r/E5p7tNmeic">ここのフォーム</a>にお願いします。<br>
                ※大学用Microsoftアカウント以外はアクセスできません。
                <br>
            </div>
            </div>
        </div>
</div>
</template>
<script>
import { defineComponent,ref } from "vue";

export default defineComponent({
    setup() {
        const rModalRef = ref(null)
        return {
            rModal:rModalRef,
            showModal(){
                if (rModalRef.value != null){
                    //@ts-ignore
                    twemoji.parse(rModalRef.value);
                    var modal = new bootstrap.Modal(rModalRef.value, {})
                    modal.show();
                }
            }
        }
    },
})
</script>
<style scoped>
    li{
        list-style: disc;
    }
</style>
