<template>
  <div class="container">
    <h1>【年別過去データ】SISTバス時刻</h1>
    <div v-if="isLoaded">
        表示したい年を選択してください。
        <div class="list-group">
            <router-link v-for="yyyy in years" :key="yyyy" :to="'/archive/' + yyyy" class="text-body">
                <div class="list-group-item cur-ptr">
                    {{yyyy}}年
                </div>
            </router-link>
        </div>
    </div>
    <div v-else>
        読み込み中...
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue'
import {getYearList} from "../../get_schedule";
export default defineComponent({
    setup() {
        const isLoadedRef = ref(null); //読み込みに成功した場合true 失敗ならfalse
        const yearsRef = ref([]);
        getYearList().then(data=>{
            yearsRef.value = Object.keys(data["yyyy"]).reverse() 
            isLoadedRef.value = true;
        }).catch(()=>{
            isLoadedRef.value = false;
        });
        return{
            isLoaded:isLoadedRef,
            years:yearsRef
        }
    }
});
</script>