<script lang="ts" setup>
import { _orderProduct, ORDER_TYPE, postOrder_API, getInventoryAccept_API } from '~/services/inventory';
import { getOrderById_API } from '~/services/shift';
const route = useRoute()
const router = useRouter()
const _smena = ref(JSON.parse(route.query.smena as any))

const _checkId = ref(route.query?.checkId || null)

async function postOrder(status: ORDER_TYPE) {
   _orderProduct.value.type = status
   _orderProduct.value.workShiftId = _smena.value.id
   const [error, response] = await postOrder_API(_orderProduct.value)

   if (error) return
   router.push({ path: `/home/stores/${route.params.id}/check`, query: { smena: route.query.smena } })
}
async function getOrderById() {
   const [error, response] = await getOrderById_API(_checkId.value as string)

   if (error) return
   _orderProduct.value.productList = response.products
}
if (_checkId.value) {
   getOrderById()
}
else {
   _orderProduct.value.productList = []
}

function close(ind) {
   _orderProduct.value.productList.splice(ind, 1)
}

const productPrice = computed(() => {
   return _orderProduct.value.productList?.reduce(
      (accumulator, item) => {
         return accumulator + item.amount * (item?.sellingPrice || item?.price)
      }, 0);
})
</script>
<template>
   <div class="pr-8">
      <div class="space-y-5">
         <div class="flex items-center justify-between" v-for="item, ind in _orderProduct.productList" :key="ind">
            <div>
               <p class="text-black font-commissioner-600">{{ item.productName || item.name }}</p>
               <div class="flex space-x-5 mt-2">
                  <span class="text-black">{{ item.amount }} {{ item.unit }}</span>
                  <span class="text-text font-commissioner-600">{{ item.amount * (item.sellingPrice || item.price) }}
                     сум</span>
               </div>
            </div>
            <button v-if="!_checkId" @click="close(ind)" class="p-0">
               <i class="icon-close danger"></i>
            </button>
         </div>
      </div>
      <div class="bg-text/20 w-full h-[1px] mt-20" />
      <div class="space-y-6 mt-6">
         <div class="flex justify-between items-center">
            <span class="text-text text-lg">К ОПЛАТЕ:</span>
            <span class="text-black font-commissioner-700 text-2xl">{{ productPrice }} сум</span>
         </div>
         <div v-if="!_checkId" class="flex gap-1">
            <el-button @click="postOrder(ORDER_TYPE.TERMINAL)" type="primary" class="w-full">ТЕРМИНАЛ</el-button>
            <el-button @click="postOrder(ORDER_TYPE.CASH)" type="primary" class="w-full">НАЛИЧНЫЕ</el-button>
            <el-button @click="postOrder(ORDER_TYPE.CASH)" type="primary" class="w-full">ДОЛГ</el-button>
         </div>
      </div>
   </div>
</template>