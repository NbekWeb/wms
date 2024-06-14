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
   <div>
      <div class="grid grid-cols-4 gap-5">
         <div class="bg-gray p-5 rounded-2xl" v-for="item, ind in _items" :key="ind">
            <h2 class="font-commissioner-600">{{ item.employee }}</h2>
            <h2 class="font-commissioner-600">{{ item.loanStatus != 'LOAN_PAID' ? $t('notpayed') : $t('payed') }}</h2>
            <div v-for="el, ind in item.products" :key="ind">
               <p>{{ $t('firstname') }}:{{ el.name }}</p>
               <p>{{ $t('unit') }}:{{ el.unit }}</p>
               <p>{{ $t('amount1') }}:{{ el.amount }}</p>
               <p>{{ $t('price') }} :{{ el.price }}</p>
            </div>
            <h2 class="font-commissioner-600">{{ $t('Totalprice') }}: {{ (+item.totalPrice).toLocaleString() }}</h2>

            <p class="font-commissioner-600" v-if="item.paidBy">{{ $t('paidBy') }} :{{ item.paidBy }}</p>
            <el-button v-if="item.loanStatus != 'LOAN_PAID'" @click="orderIdPaid(item.id)" class="!py-1 mt-4"
               type="primary">{{ $t('pay1') }}</el-button>
         </div>
      </div>
   </div>
</template>