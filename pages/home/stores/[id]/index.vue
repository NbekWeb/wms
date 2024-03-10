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
const router = useRouter()

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
   <div>
      <!-- <ExpenseModal @update="loadItems" ref="_modalRef" /> -->

      <div class="flex items-center justify-between">
         <h2 class="font-commissioner-700 text-4xl"><i @click="router.go(-1)" class="ri-arrow-left-line mr-2 cursor-pointer"></i>{{ $t('store1') }}</h2>
      </div>
      <div v-if="_itemsShift.content.length > 0">
         <div class="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            <div
               @click="$router.push({ path: `/home/stores/${$route.params.id}/check`, query: { smena: JSON.stringify(item) } })"
               v-for="item, ind in  _itemsShift.content" :key="ind">
               <div class="p-4 space-y-2 border border-text/20 overflow-hidden mt-5">
                  <span class="font-commissioner-600 text-black">{{ $t('change') }} №{{ item.id }}</span>
                  <div class="flex space-x-2">
                     <span class="text-text">{{ $t('employeeName') }}: </span>
                     <span class="text-black font-commissioner-600">{{ item.employeeName}}</span>
                  </div>
                  <div class="flex space-x-2">
                     <span class="text-text">{{ $t('start') }}: </span>
                     <span class="text-black font-commissioner-600">{{ formatDate_UTIL(item.createdDate, false) }}</span>
                  </div>
                  <div class="flex space-x-2">
                     <span class="text-text">  {{ $t('end') }}: </span>
                     <span v-if="item.closedDate" class="text-black font-commissioner-600">{{formatDate_UTIL(item.closedDate, false) }} </span>
                     <span v-else class="text-black font-commissioner-600"> -</span>
                  </div>
               </div>
            </div>
         </div>
         <button @click="createShift" class="flex h-12 items-center bg-black text-white space-x-3 mx-auto mt-8">
            <i class="icon-plus white"></i>
            <span>{{ $t('openingShift') }}</span>
         </button>
      </div>

      <NoData v-else :title="$t('openingShift')" @set="createShift" />
   </div>
</template>

<style>
.tab {
   @apply !p-0 !text-black !bg-white !relative;
}

.router-link-exact-active {
   @apply !font-commissioner-600;
}

</style>