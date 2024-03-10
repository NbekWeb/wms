<script lang="ts" setup>
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "~/services/network";
import { createShift_API, type ShiftModel, getOrderById_API } from "~/services/shift"
import { getInventoriesStoreId_API, type InventoryModel, _sendProduct } from '~/services/inventory';
import { formatDate_UTIL } from "~/utils/date";
const _itemsShift = ref<BaseListResponse<ShiftModel>>(getBaseListResponse_DEFAULT())
const items = ref<BaseListResponse<InventoryModel>>(getBaseListResponse_DEFAULT())
const route = useRoute()
const router = useRouter()
const _smena = ref(JSON.parse(route?.query?.smena as any))
const mobileVisible = ref(false)
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
   <div>
      <div class="flex items-center justify-between">
         <h2 class="font-commissioner-700 text-4xl"><i @click="router.go(-1)"
               class="ri-arrow-left-line mr-2 cursor-pointer"></i>Чек </h2>
      </div>
      <div class="flex space-x-2 mt-5">
         <span class="font-commissioner-600 text-black">{{ $t('change') }} № {{ _smena.id }}</span>
         <div class="flex space-x-2">
            <span class="text-text">{{ $t('start') }}: </span>
            <span class="text-black font-commissioner-600">{{ formatDate_UTIL(_smena.createdDate, false) }}</span>
         </div>
      </div>
      <div class="mt-8">
         <div class="max-lg:hidden bg-text/20 w-full h-[1px]" />
         <el-button class="max-lg:!block !hidden" @click="mobileVisible = true" type="primary">{{ $t('collegentTovar') }}</el-button>
         <div class="grid grid-cols-3 max-lg:grid-cols-2">
            <div class="max-lg:!hidden">
               <StoreProductsList class="max-lg:!hidden mt-5 border-r border-r-text/20 h-fit" />
            </div>
            <div class="col-span-2 p-8 pr-0 max-lg:p-0 max-lg:mt-5">
               <el-input :placeholder="$t('searchTovar')" />
               <div class="grid grid-cols-3 max-xl:grid-cols-2  max-md:grid-cols-2 gap-4 mt-5">
                  <StoreProductCard v-for="item of items.content" :key="item.productId" :item="item" />
                  <el-pagination v-if="items.totalPages > 1" class="mt-8" background :current-page="items.currentPage"
                     layout="prev, pager, next" :total="items.totalElements" @current-change="handleChange" />
               </div>
            </div>
         </div>
      </div>
      <el-dialog v-model="mobileVisible" width="500">
         <StoreProductsList @update="loadItems" class="w-full mt-5 border-r border-r-text/20 h-fit" />

      </el-dialog>
   </div>
</template>
<style lang="scss">
.el-dialog {
   @media(max-width:578px){
      width: 90%!important;
      --el-dialog-width: 90%!important;
   }
}
</style>