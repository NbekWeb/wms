<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { type ProductModel, getProductsByStatus_API, PRODUCT_STATUS_ENUM, getProductsAutocomplete_API, getProduct_DEFAULT } from '@/services/product';
import { getInventoriesByWarehouseId_API, type InventoryModel, _sendProduct } from '~/services/inventory';
import { type StoreModel, getStoresWarehouse_API } from '@/services/store';

const items = ref<BaseListResponse<InventoryModel>>(getBaseListResponse_DEFAULT())
const mobileVisible = ref(false)
// const items = ref<InventoryModel[]>([])
const route = useRoute()
const router = useRouter()
const _stores = ref<StoreModel[]>([])

async function loadItems() {
   console.log("Loading")
   const [error, response] = await getInventoriesByWarehouseId_API(route.params.id as string)
   if (error) return

   items.value = response
}

async function getStore() {
   const [error, response] = await getStoresWarehouse_API(route?.params?.id as string)

   if (error) return
   _stores.value = response
}
getStore()

async function handleChange(page: number) {
   items.value.currentPage = page || 1
   await router.replace({ query: { page } })
   loadItems();
}

loadItems()

function handleSelect(e: string) {
   _sendProduct.value.storeId = e
}
</script>

<template>
   <div>
      <div @click="$router.go(-1)" class="flex gap-2 mb-2">
         <img src="@/assets/img/black.svg" />
         <p class="font-commissioner-600">Назад</p>
      </div>
      <div class="flex items-center justify-between">
         <h2 class="font-commissioner-700 text-4xl max-lg:text-3xl">Реализация товаров</h2>
      </div>
      <div class="space-y-4 mt-6 w-[420px] max-sm:w-full">
         <p class="text-2xl font-commissioner-700 max-xl:text-xl">Магазин для реализации</p>
         <el-select @change="handleSelect" placeholder="Название магазина" class="w-full"
            v-model="_sendProduct.storeId">
            <el-option v-for="item of _stores" :key="item.id" :label="item.title" :value="item.id" />
         </el-select>
         <!-- <el-select class="w-full" placeholder="Название магазина"></el-select> -->
      </div>

      <div class="mt-8">
         <div class="bg-text/20 max-lg:hidden max-lg:h-0 w-full h-[1px]" />

         <el-button class="max-lg:!block !hidden" @click="mobileVisible = true" type="primary">СОБРАННЫЕ ТОВАРЫ</el-button>
         <div class="grid grid-cols-3 max-lg:grid-cols-2">
            <WarehouseProductsList @update="loadItems" class="max-lg:hidden mt-5 border-r border-r-text/20 h-fit" />
            <div class="col-span-2 p-8 pr-0 max-lg:p-0 max-lg:mt-5">
               <el-input placeholder="Поиск по товарам" />
               <div class="grid grid-cols-3 max-xl:grid-cols-2  max-md:grid-cols-2 gap-4 mt-5">
                  <WarehouseProductCard v-for="item of items.content" :key="item.productId" :item="item" />
                  <el-pagination v-if="items.totalPages > 1" class="mt-8" background :current-page="items.currentPage"
                     layout="prev, pager, next" :total="items.totalElements" @current-change="handleChange" />
               </div>
            </div>
         </div>
      </div>
      <el-dialog v-model="mobileVisible" width="500px">
         <WarehouseProductsList @update="loadItems" class="mt-5 border-r border-r-text/20 h-fit" />

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