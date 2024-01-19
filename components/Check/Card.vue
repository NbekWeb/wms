<script lang="ts" setup>
import { type PropType } from "vue"
import { type ExpenseModel } from "@/services/expense"
import { formatDate_UTIL } from "~/utils/date";
const props = defineProps({
   item: {
      type: Object as PropType<ExpenseModel>,
      required: true
   }
})
</script>

<template>
   <div class="p-5 flex items-center justify-between border border-text/20">
      <div>
         <p class="text-text/80">{{ formatDate_UTIL(item.createdDate, false) }}</p>
         <div class="flex space-x-2 mt-2">
            <span class="text-black font-commissioner-600">Чек № {{ item.id }}</span>
            <span class="text-text font-commissioner-600">{{ item.totalPrice }} сум</span>
         </div>
         <div>
            <p>{{ item.type }}</p>
         </div>
      </div>
      <!-- <NuxtLink to="check/create"> -->
      <button @click="$router.replace({ path: `/home/stores/${$route.params.id}/product`, query: {...$route.query, checkId: item.id} })"
         class="border border-black text-black font-commissioner-700">Открыть</button>
      <!-- </NuxtLink> -->
   </div>
</template>