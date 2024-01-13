<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { type ProductModel, getProductsByStatus_API, PRODUCT_STATUS_ENUM, getProductsAutocomplete_API, getProduct_DEFAULT } from '@/services/product';
const _itemsProduct = ref<BaseListResponse<ProductModel>>(getBaseListResponse_DEFAULT())
const router = useRouter()

async function loadItems() {
   console.log("Loading")
   console.log(_itemsProduct.value.currentPage)
   const [error, response] = await getProductsByStatus_API(PRODUCT_STATUS_ENUM.ACCEPTED, _itemsProduct.value.currentPage - 1)
   if (error) return

   _itemsProduct.value = response
}

async function handleChange(page: number) {
   _itemsProduct.value.currentPage = page || 1
   await router.replace({ query: { page } })
   loadItems();
}

loadItems()
</script>

<template>
   <NuxtLayout name="default">
      <div class="flex items-center justify-between">
         <h2 class="font-commissioner-700 text-4xl">Реализация товаров</h2>
      </div>
      <div class="space-y-4 mt-6 w-[420px]">
         <p class="text-2xl font-commissioner-700">Магазин для реализации</p>
         <el-select class="w-full" placeholder="Название магазина"></el-select>
      </div>

      <div class="mt-8">
         <div class="bg-text/20 w-full h-[1px]" />

         <div class="grid grid-cols-3">
            <WarehouseProductsList class="mt-5 border-r border-r-text/20 h-fit" />
            <div class="col-span-2 p-8 pr-0">
               <el-input placeholder="Поиск по товарам" />
               <div class="grid grid-cols-3 gap-4 mt-5">
                  <WarehouseProductCard v-for="item of _itemsProduct.content" :key="item.id" :item="item" />
                  <el-pagination v-if="_itemsProduct.totalPages > 1" class="mt-8" background
                     :current-page="_itemsProduct.currentPage" layout="prev, pager, next"
                     :total="_itemsProduct.totalElements" @current-change="handleChange" />

               </div>
            </div>
         </div>
      </div>
   </NuxtLayout></template>