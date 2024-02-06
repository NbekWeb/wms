<script setup lang="ts">
import { type OrderReportModel, getOrderReport_DEFAULT, getOrderReport_API } from "~/services/shift"

const _item = ref<OrderReportModel>(getOrderReport_DEFAULT())
const route = useRoute()
const router = useRouter()

const _smena = ref(JSON.parse(route.query?.smena as any))

async function getOrderReport() {
   const [error, response] = await getOrderReport_API(_smena.value.id as string)

   if (error) return
   _item.value = response
}
getOrderReport()

</script>

<template>
   <div>
      <div class="w-1/2 bg-gray p-5 rounded-2xl">
         <h2 class="font-commissioner-600 text-2xl">{{ _item.employee.firstname + ' ' + _item.employee.lastname }}</h2>
         <div class="flex justify-between mt-2">
            <p class="font-commissioner-600 text-lg">выгода</p>
            <div class="border-b border-dashed grow  border-black/40 mb-1"></div>
            <p class="font-commissioner-600 text-lg">{{ _item.profit.toLocaleString() }} сум</p>
         </div>
         <div class="flex justify-between mt-2">
            <p class="font-commissioner-600 text-lg">Чистая прибыль</p>
            <div class="border-b border-dashed grow  border-black/40 mb-1"></div>
            <p class="font-commissioner-600 text-lg">{{ _item.pureProfit.toLocaleString() }} сум</p>
         </div>
         <div class="flex justify-between mt-2">
            <p class="font-commissioner-600 text-lg">Общий ввод</p>
            <div class="border-b border-dashed grow  border-black/40 mb-1"></div>
            <p class="font-commissioner-600 text-lg">{{ _item.totalInput.toLocaleString() }} сум</p>
         </div>
         <div class="flex justify-between mt-2">
            <p class="font-commissioner-600 text-lg">Общий объем производства</p>
            <div class="border-b border-dashed grow  border-black/40 mb-1"></div>
            <p class="font-commissioner-600 text-lg">{{ _item.totalOutput.toLocaleString() }} сум</p>
         </div>
      </div>
   </div>
</template>