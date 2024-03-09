<script setup lang="ts">
import { type ExpenseModel, getExpensesByStoreId_API } from "@/services/expense"
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "~/services/network";

const _items = ref<BaseListResponse<ExpenseModel>>(getBaseListResponse_DEFAULT())
const _modalRef = ref()
const route = useRoute()
const _smena = ref(JSON.parse(route.query?.smena as any))

async function loadItems() {
   const [error, response] = await getExpensesByStoreId_API(_smena.value.id)

   if (error) return
   _items.value = response
}

function openModal() {
   _modalRef.value?.open()
}
function editModal(item: any) {
   _modalRef.value?.open(item)
}

function handleItem() {
   loadItems()
}

loadItems()
</script>

<template>
   <div>
      <ExpenseModal @update="loadItems" ref="_modalRef" />

      <div class="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1">
         <ExpenseCard @update="handleItem" @edit="editModal" v-for="item, idx of _items.content" :key="idx" :item="item" />
      </div>
      <div v-if="!_smena.closedDate" class="flex justify-center w-full mt-10">
         <button @click="openModal" class="h-12 flex items-center bg-black text-white space-x-3 max-sm:w-full max-sm:justify-center">
            <i class="icon-plus white"></i>
            <span>Добавить расход</span>
         </button>
      </div>
   </div>
</template>