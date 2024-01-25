<script setup lang="ts">
import { type ExpenseModel, getExpensesByStoreId_API } from "@/services/expense"
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "~/services/network";
import { closeShift_API, type OrderShiftModel, getOrderWorkShift_API } from "~/services/shift"

const _items = ref<BaseListResponse<ExpenseModel>>(getBaseListResponse_DEFAULT())
const route = useRoute()
const router = useRouter()
const props = defineProps({
   items: {
      type: Object as PropType<OrderShiftModel[]>,
      required: true,
   }
})
const _smena = ref(JSON.parse(route.query?.smena as any))

async function closeShift() {
   const [error, response] = await closeShift_API(_smena.value.id as string)

   if (error) return
   router.push({ path: `/home/stores/${route.params.id}` })
}

async function createShift() {
   router.push({ path: `/home/stores/${route.params.id}/product`, query: route.query })
}
</script>

<template>
   <div>
      <div v-if="props.items?.length" class="grid grid-cols-3">
         <CheckCard v-for="item, idx of props.items" :key="idx" :item="item" />
      </div>
      <NoData v-else title="Создать чек" @set="createShift" />

      <div v-if="props.items?.length && !_smena.closedDate" class="flex gap-4 w-full mt-10 justify-center">
         <button @click="createShift" class="flex h-12 items-center bg-black text-white space-x-3">
            <i class="icon-plus white"></i>
            <span>Создать чек</span>
         </button>
         <button @click="closeShift" class="h-12 flex items-center bg-black text-white space-x-3">
            <span>Закрыть смену</span>
         </button>
      </div>
   </div>
</template>