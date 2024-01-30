<script lang="ts" setup>
const route = useRoute()
import { getOrderCustomer_API, orderIdPaid_API } from '~/services/shift';
const _items = ref<any>([])
async function getOrderCustomer() {
   const [error, response] = await getOrderCustomer_API(route.params.id as string)

   if (error) return
   _items.value = response
}
async function orderIdPaid(id: string) {
   const [error, response] = await orderIdPaid_API(id as string)

   if (error) return
   getOrderCustomer()
   ElMessage.success("to'landi")
}
getOrderCustomer()
</script>

<template>
   <NuxtLayout>
      <div class="grid grid-cols-4 gap-5">
         <div class="bg-gray p-5 rounded-2xl" v-for="item, ind in _items" :key="ind">
            <h2 class="font-commissioner-600">{{ item.employee }}</h2>
            <h2 class="font-commissioner-600">{{ item.loanStatus != 'LOAN_PAID' ? "To'lanmagan" : "To'langan" }}</h2>
            <div v-for="el, ind in item.products" :key="ind">
               <p>name:{{ el.name }}</p>
               <p>unit:{{ el.unit }}</p>
               <p>amount:{{ el.amount }}</p>
               <p>price:{{ el.price }}</p>
            </div>
            <h2 class="font-commissioner-600">Totalprice: {{ (+item.totalPrice).toLocaleString() }}</h2>
            <el-button v-if="item.loanStatus != 'LOAN_PAID'" @click="orderIdPaid(item.id)" class="!py-1 mt-4"
               type="primary">To'lash</el-button>
         </div>
      </div>
   </NuxtLayout>
</template>