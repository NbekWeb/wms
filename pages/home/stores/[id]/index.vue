<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "~/services/network";
import { createShift_API, type ShiftModel, getShift_API } from "~/services/shift"
import { formatDate_UTIL } from '~/utils/date';
const activeName = ref('first')

const _itemsShift = ref<BaseListResponse<ShiftModel>>(getBaseListResponse_DEFAULT())
const _modalRef = ref()
const route = useRoute()
const handleClick = (tab: TabsPaneContext, event: Event) => {
   console.log(tab, event)
}

async function getShift() {
   const [error, response] = await getShift_API(route.params.id as string, _itemsShift.value.currentPage - 1)

   if (error) return
   _itemsShift.value = response
}
getShift()
async function createShift() {
   const [error, response] = await createShift_API(route.params.id as string)
   console.log(response);

   if (error) return
   getShift()
}

// function openModal() {
//    _modalRef.value?.open()
// }


</script>

<template>
   <NuxtLayout name="default">
      <!-- <ExpenseModal @update="loadItems" ref="_modalRef" /> -->

      <div class="flex items-center justify-between">
         <h2 class="font-commissioner-700 text-4xl">Магазин</h2>
      </div>
      <div v-if="_itemsShift.content.length > 0">
         <div class="grid grid-cols-3">
            <div @click="$router.push({ path: `/home/stores/${$route.params.id}/check`, query: { smena: JSON.stringify(item) } })"
               v-for="item, ind in  _itemsShift.content" :key="ind">
               <div class="p-4 space-y-2 border border-text/20 overflow-hidden mt-5">
                  <span class="font-commissioner-600 text-black">Смена №{{ item.id }}</span>
                  <div class="flex space-x-2">
                     <span class="text-text">Начало: </span>
                     <span class="text-black font-commissioner-600">{{ formatDate_UTIL(item.createdDate, false) }}</span>
                  </div>
                  <div v-if="item.closedDate" class="flex space-x-2">
                     <span class="text-text">Заканчивать: </span>
                     <span class="text-black font-commissioner-600">{{ formatDate_UTIL(item.closedDate, false) }}</span>
                  </div>
               </div>
            </div>
         </div>
         <button @click="createShift" class="flex h-12 items-center bg-black text-white space-x-3 mx-auto mt-8">
            <i class="icon-plus white"></i>
            <span>Открытие смены</span>
         </button>
      </div>

      <NoData v-else title="Открытие смены" @set="createShift" />
   </NuxtLayout>
</template>

<style>
.tab {
   @apply !p-0 !text-black !bg-white !relative;
}

.router-link-exact-active {
   @apply !font-commissioner-600;
}

.router-link-exact-active::after {
   @apply !font-commissioner-600 bg-black;
   content: '';
   position: absolute;
   bottom: -10px;
   left: 0;
   width: 100%;
   height: 2px;
}
</style>