<script lang="ts" setup>
import { type AnalyticStoreResponseModel, postAnalyticReport_API, DATE_EMUN, DATE_EMUN_TR } from "@/services/analytic"
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "~/services/network";
import { type StoreModel, getStores_API } from '@/services/store';
import { getFileURL_UTIL } from '@/utils/file';
import { formatDate_UTIL } from "@/utils/date";
import { LOAN_STATUS_TR, ORDER_TYPE_TR } from "@/services/shift"
const _items = ref<AnalyticStoreResponseModel[]>([])
const _currentPage = ref<number>(1)
const router = useRouter()
const _type = ref(DATE_EMUN.DAY)

async function postAnalyticReport() {
   const [response, error] = await postAnalyticReport_API(_type.value, _currentPage.value - 1)

   if (error) return
   _items.value = response
}
postAnalyticReport()


async function handleChange(page: number) {
   _currentPage.value = _currentPage.value + page

   await router.replace({ query: { page: _currentPage.value } })
   postAnalyticReport();
}


</script>
<template>
   <div>
      <div>
         <div class="flex w-max items-center justify-center rounded-3xl border-2 border-primary/30 p-[2px]">
            <div @click="_type = DATE_EMUN.DAY; postAnalyticReport()" :class="{ 'bg-black': _type === DATE_EMUN.DAY }"
               class="rounded-3xl px-4 py-3 text-black">
               <p :class="{ 'text-white': _type === DATE_EMUN.DAY }">{{ DATE_EMUN_TR.get(DATE_EMUN.DAY) }}</p>
            </div>
            <div @click="_type = DATE_EMUN.MONTH; postAnalyticReport()" :class="{ 'bg-black': _type === DATE_EMUN.MONTH }"
               class="rounded-3xl px-4 py-3 text-black">
               <p :class="{ 'text-white': _type === DATE_EMUN.MONTH }">{{ DATE_EMUN_TR.get(DATE_EMUN.MONTH) }}</p>
            </div>
            <div @click="_type = DATE_EMUN.YEAR; postAnalyticReport()" :class="{ 'bg-black': _type === DATE_EMUN.YEAR }"
               class="rounded-3xl px-4 py-3 text-black">
               <p :class="{ 'text-white': _type === DATE_EMUN.YEAR }">{{ DATE_EMUN_TR.get(DATE_EMUN.YEAR) }}</p>
            </div>
         </div>
         <section class="mt-7">
            <el-table class="w-full tables" :data="_items" border table-layout="auto">
               <el-table-column type="index" width="80" label="#" />

               <el-table-column label="day">
                  <template #default="{ row }">
                     <span>{{ row.day.toString().padStart(2, 0) + "." + row.month.toString().padStart(2, 0) + '.' +
                        row.year }}</span>
                  </template>
               </el-table-column>
               <el-table-column label="totalInput">
                  <template #default="{ row }">
                     <span>{{ row.totalInput }}</span>
                  </template>
               </el-table-column>

               <el-table-column label="totalOutput">
                  <template #default="{ row }">
                     <span> {{ row.totalOutput }}</span>
                  </template>
               </el-table-column>
               <el-table-column label="profit">
                  <template #default="{ row }">
                     <span> {{ row.profit }}</span>
                  </template>
               </el-table-column>
               <el-table-column label="pureProfit">
                  <template #default="{ row }">
                     <span> {{ row.pureProfit }}</span>
                  </template>
               </el-table-column>
            </el-table>
            <div class="mt-6">
               <ElButton type="primary" plain :disabled="_currentPage < 2" @click="handleChange(-1)">Oldingi</ElButton>
               <ElButton type="primary" @click="handleChange(1)">keyingi</ElButton>
            </div>
         </section>
      </div>
   </div>
</template>

<style></style>