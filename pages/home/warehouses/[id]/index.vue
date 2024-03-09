<script setup lang="ts">
import { getInventoriesByWarehouseId_API, type InventoryModel } from '~/services/inventory';
const _warehouseProductModalRef = ref()
const _warehouseAddProductModalRef = ref()
const _warehouseProductRealisationModalRef = ref()
const items = ref<InventoryModel[]>([])
const route = useRoute()
function openWarehouseProductModal(item: InventoryModel) {
   _warehouseProductModalRef.value?.open(item)
}

function openWarehouseAddProductModal() {
   _warehouseAddProductModalRef.value?.open()
}

function openWarehouseProductRealisationModal() {
   _warehouseProductRealisationModalRef.value?.open()
}

async function loadItems() {
   const [error, response] = await getInventoriesByWarehouseId_API(route.params.id as string)

   if (error) return

   items.value = response.content
}
loadItems()
// const items = [
//     {
//         id: 1,
//         fullname: 'Наименование товара',
//         count: '100 кг',
//         price: '50 000 сум',
//         sellPrice: '80 000 сум',
//         coountParty: '2'
//     }
// ]
</script>

<template>
   <div>
      <WarehouseProductModal ref="_warehouseProductModalRef" />
      <WarehouseAddProductModal @update="loadItems" ref="_warehouseAddProductModalRef" />
      <WarehouseProductRealisationModal ref="_warehouseProductRealisationModalRef" />

      <div class="flex items-center justify-between max-md:flex-col max-md:gap-y-4 max-md:items-start">
         <h2 class="font-commissioner-700 text-4xl">Склады</h2>
         <div class="flex space-x-2">
            <NuxtLink :to="`/home/warehouses/${$route.params.id}/realisationProduct`">
               <button class="h-12 flex items-center space-x-3 text-black border border-black">
                  <span>Реализация товаров</span>
               </button>
            </NuxtLink>
            <button @click="openWarehouseAddProductModal()"
               class="h-12 flex items-center space-x-3 bg-black text-white">
               <i class="icon-plus white"></i>
               <span>Добавить</span>
            </button>
         </div>
      </div>
      <div class="mt-8 w-full hidden max-lg:block">
         <div class="p-4 border border-black/20" v-for="item, ind in items" :key="ind">
            <p @click="openWarehouseProductModal(item)" class="font-commissioner-500 mb-4">{{ item.productName }}</p>
            <div class="grid grid-cols-2 gap-y-3">
               <div>
                  <p class="!text-black/40 mb-1">КОЛ-ВО</p>
                  <p>{{ item.amount }} кг</p>
               </div>
               <div>
                  <p class="!text-black/40 mb-1">ЗАКУПОЧНАЯ ЦЕНА</p>
                  <p>{{ item.basePrice.toLocaleString() }} сум</p>
               </div>
               <div>
                  <p class="!text-black/40 mb-1">ПАРТИИ</p>
                  <p>{{ item.partCount.toLocaleString() }}</p>
               </div>
               <div>
                  <p class="!text-black/40 mb-1">ПРОДАЖНАЯ ЦЕНА</p>
                  <p>{{ item.sellingPrice.toLocaleString() }} сум</p>
               </div>
            </div>
         </div>
      </div>
      <el-table class="mt-8 w-full max-lg:hidden" :data="items" border table-layout="auto">
         <el-table-column type="index" width="80" label="#" />
         <el-table-column label="НАИМЕНОВАНИЕ ТОВАРА">
            <template #default="{ row }">
               <span>{{ row.productName }}</span>
            </template>
         </el-table-column>
         <el-table-column label="КОЛ-ВО">
            <template #default="{ row }">
               <span>{{ row.amount }}</span>
            </template>
         </el-table-column>
         <el-table-column label="ЗАКУПОЧНАЯ ЦЕНА">
            <template #default="{ row }">
               <span>{{ row.basePrice }}</span>
            </template>
         </el-table-column>
         <el-table-column label="ПРОДАЖНАЯ ЦЕНА">
            <template #default="{ row }">
               <span>{{ row.sellingPrice }}</span>
            </template>
         </el-table-column>
         <el-table-column label="КОЛ-ВО ПАРТИЙ">
            <template #default="{ row }">
               <span>{{ row.partCount }}</span>
            </template>
         </el-table-column>

         <el-table-column label="ЕЩЁ">
            <template #default="{ row }">
               <el-dropdown trigger="click">
                  <button class="bg-black py-1 px-2">
                     <img src="@/assets/img/dots.svg" />
                  </button>

                  <template #dropdown>
                     <div>
                        <el-dropdown-menu>
                           <el-dropdown-item>
                              <button @click="openWarehouseProductModal(row)" class="text-white">
                                 See product info
                              </button>
                           </el-dropdown-item>
                        </el-dropdown-menu>
                     </div>
                  </template>
               </el-dropdown>
            </template>
         </el-table-column>
      </el-table>
   </div>
</template>
<style lang="scss">
  .el-overlay-dialog{
   left: 20px!important;
   right: 20px!important;
 }

</style>