<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { type ExpenseModel, getExpensesByStoreId_API } from "@/services/expense"
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "~/services/network";
import { createShift_API, type OrderShiftModel, getOrderWorkShift_API } from "~/services/shift"
import { formatDate_UTIL } from '~/utils/date';

const activeName = ref('first')
const _itemsShift = ref<BaseListResponse<OrderShiftModel>>(getBaseListResponse_DEFAULT())
// const _items = ref<BaseListResponse<ExpenseModel>>(getBaseListResponse_DEFAULT())
const _modalRef = ref()
const route = useRoute()
const router = useRouter()
const _smena = ref(JSON.parse(route?.query?.smena as string))
const handleClick = (tab: TabsPaneContext, event: Event) => {
   console.log(tab, event)
}

// async function loadItems() {
//     const [error, response] = await getExpensesByStoreId_API(_smena.value.id as string)

//     if (error) return
//     _items.value = response
// }

async function getOrderWorkShift() {
   const [error, response] = await getOrderWorkShift_API(_smena.value.id as string, _itemsShift.value.currentPage - 1)

   if (error) return
   _itemsShift.value = response
}
getOrderWorkShift()

async function createShift() {
   const [error, response] = await createShift_API(route.params.id as string)
   console.log(response);

   if (error) return
   getOrderWorkShift()
}

function openModal() {
   _modalRef.value?.open()
}

// loadItems()

</script>

<template>
   <div>
      <!-- <ExpenseModal @update="loadItems" ref="_modalRef" /> -->

      <div class="flex items-center justify-between">
         <h2 class="font-commissioner-700 text-4xl"> <i @click="router.go(-1)" class="ri-arrow-left-line mr-2 cursor-pointer"></i>{{ $t('store1') }}</h2>
      </div>
      <!-- <div v-if="_itemsShift.content.length > 0"> -->
      <div class="flex space-x-2 mt-5">
         <span class="font-commissioner-600 text-black">{{ $t('change') }} №{{ _smena?.id }}</span>
         <div class="flex space-x-2">
            <span class="text-text">{{ $t('start') }}: </span>
            <span class="text-black font-commissioner-600">{{ formatDate_UTIL(_smena?.createdDate) }}</span>
         </div>
      </div>
      <el-tabs v-model="activeName" class="demo-tabs mt-5" @tab-click="handleClick">
         <el-tab-pane :label="$t('checks')" name="first">
            <Checks :items="_itemsShift?.content" />
         </el-tab-pane>
         <el-tab-pane :label="$t('expenses')" name="second">
            <Expenses />
         </el-tab-pane>
         <el-tab-pane v-if="_smena.closedDate" :label="$t('salesReport')" name="third">
            <StoreAnalitika />
         </el-tab-pane>
      </el-tabs>
      <!-- </div> -->

      <!-- <NoData v-else title="Открытие смены" @set="createShift" /> -->
   </div>
</template>

<style>
.tab {
   @apply !p-0 !text-black !bg-white !relative;
}

.router-link-exact-active {
   @apply !font-commissioner-600;
}

</style>