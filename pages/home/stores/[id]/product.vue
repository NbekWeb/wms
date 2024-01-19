<script lang="ts" setup>
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "~/services/network";
import { createShift_API, type ShiftModel, getOrderById_API } from "~/services/shift"
import { getInventoriesStoreId_API, type InventoryModel, _sendProduct } from '~/services/inventory';
import { formatDate_UTIL } from "~/utils/date";
const _itemsShift = ref<BaseListResponse<ShiftModel>>(getBaseListResponse_DEFAULT())
const items = ref<BaseListResponse<InventoryModel>>(getBaseListResponse_DEFAULT())
const route = useRoute()
const _smena = ref(JSON.parse(route?.query?.smena as any))

async function loadItems() {
   console.log("Loading")
   const [error, response] = await getInventoriesStoreId_API(route.params.id as string)
   if (error) return

   items.value = response
}

loadItems()
// async function getShift() {
//    const [error, response] = await getShift_API(_itemsShift.value.currentPage - 1)

//    if (error) return
//    _itemsShift.value = response
// }
// getShift()


</script>

<template>
   <NuxtLayout>
      <div class="flex items-center justify-between">
         <h2 class="font-commissioner-700 text-4xl">Чек </h2>
      </div>
         <div class="flex space-x-2 mt-5">
            <span class="font-commissioner-600 text-black">Смена № {{ _smena.id }}</span>
            <div class="flex space-x-2">
               <span class="text-text">Начало: </span>
               <span class="text-black font-commissioner-600">{{  formatDate_UTIL(_smena.createdDate, false)  }}</span>
            </div>
         </div>
      <div class="mt-8">
         <div class="bg-text/20 w-full h-[1px]" />

         <div class="grid grid-cols-3">
            <StoreProductsList class="mt-5 border-r border-r-text/20 h-fit" />
            <div class="col-span-2 p-8 pr-0">
               <el-input placeholder="Поиск по товарам" />
               <div class="grid grid-cols-3 gap-4 mt-5">
                  <StoreProductCard v-for="item of items.content" :key="item.productId" :item="item" />
                  <el-pagination v-if="items.totalPages > 1" class="mt-8" background :current-page="items.currentPage"
                     layout="prev, pager, next" :total="items.totalElements" @current-change="handleChange" />
               </div>
            </div>
         </div>
      </div>
   </NuxtLayout>
</template>