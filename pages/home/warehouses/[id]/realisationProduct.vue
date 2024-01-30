<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { type ProductModel, getProductsByStatus_API, PRODUCT_STATUS_ENUM, getProductsAutocomplete_API, getProduct_DEFAULT } from '@/services/product';
import { getInventoriesByWarehouseId_API, type InventoryModel, _sendProduct } from '~/services/inventory';
import { type StoreModel, getStoresWarehouse_API } from '@/services/store';

const items = ref<BaseListResponse<InventoryModel>>(getBaseListResponse_DEFAULT())

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
   <NuxtLayout name="default">
      <div class="flex items-center justify-between">
         <h2 class="font-commissioner-700 text-4xl">Реализация товаров</h2>
      </div>
      <div class="space-y-4 mt-6 w-[420px]">
         <p class="text-2xl font-commissioner-700">Магазин для реализации</p>
            <el-select @change="handleSelect"  placeholder="Название магазина" class="w-full" v-model="_sendProduct.storeId">
               <el-option v-for="item of _stores" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
         <!-- <el-select class="w-full" placeholder="Название магазина"></el-select> -->
      </div>

      <div class="mt-8">
         <div class="bg-text/20 w-full h-[1px]" />

         <div class="grid grid-cols-3">
            <WarehouseProductsList @update="loadItems" class="mt-5 border-r border-r-text/20 h-fit" />
            <div class="col-span-2 p-8 pr-0">
               <el-input placeholder="Поиск по товарам" />
               <div class="grid grid-cols-3 gap-4 mt-5">
                  <WarehouseProductCard v-for="item of items.content" :key="item.productId" :item="item" />
                  <el-pagination v-if="items.totalPages > 1" class="mt-8" background
                     :current-page="items.currentPage" layout="prev, pager, next"
                     :total="items.totalElements" @current-change="handleChange" />
               </div>
            </div>
         </div>
      </div>
   </NuxtLayout></template>