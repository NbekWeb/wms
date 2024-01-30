<script lang="ts" setup>
import { _sendProduct, sentInventory_API, getInventoryAccept_API, getInventorySent_DEFAULT } from '~/services/inventory';
const route = useRoute()
const emit = defineEmits(['update'])

async function sentInventory() {
   const [error, response] = await sentInventory_API(_sendProduct.value)

   if (error) return
   // getInventoryAccept()
   _sendProduct.value = getInventorySent_DEFAULT()
   emit('update')
}
async function getInventoryAccept() {
   const [error, response] = await getInventoryAccept_API(route.params.id as string)

   if (error) return
}

function close(ind: number) {
   _sendProduct.value.inventories.splice(ind, 1)
}
const productCount = computed(() => {
   return _sendProduct.value.inventories.reduce(
      (accumulator, item) => {
         return accumulator + +item.amount
      }, 0);
})
const productPrice = computed(() => {
   return _sendProduct.value.inventories.reduce(
      (accumulator, item) => {
         return accumulator + item.amount * item.sellingPrice
      }, 0);
})
</script>
<template>
   <div class="pr-8">
      <div class="space-y-5">
         <div class="flex items-center justify-between" v-for="item, ind in _sendProduct.inventories" :key="ind">
            <div>
               <p class="text-black font-commissioner-600">{{ item.productName }}</p>
               <div class="flex space-x-5 mt-2">
                  <span class="text-black">{{ item.amount }} {{ item.unit }}</span>
                  <span class="text-text font-commissioner-600">{{ item.amount * item.sellingPrice }} сум</span>
               </div>
            </div>
            <button @click="close(ind)" class="p-0">
               <i class="icon-close danger"></i>
            </button>
         </div>
      </div>
      <div class="bg-text/20 w-full h-[1px] mt-20" />
      <div class="space-y-6 mt-6">
         <p class="text-text text-lg">ИТОГО:</p>
         <div class="flex justify-between items-center">
            <span class="text-text text-lg">Товаров:</span>
            <span class="text-black font-commissioner-700 text-2xl">{{ productCount }}</span>
         </div>
         <div class="flex justify-between items-center">
            <span class="text-text text-lg">Сумма:</span>
            <span class="text-black font-commissioner-700 text-2xl">{{ productPrice }} сум</span>
         </div>
         <el-button @click="sentInventory" type="primary" class="w-full">ОТПРАВИТЬ В МАГАЗИН</el-button>
      </div>
   </div>
</template>