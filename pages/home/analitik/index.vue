<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { type ExpenseModel, getExpensesByStoreId_API } from "@/services/expense"
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "~/services/network";
import { createShift_API, type OrderShiftModel, getOrderWorkShift_API } from "~/services/shift"
import { formatDate_UTIL } from '~/utils/date';

const activeName = ref('first')
const _itemsShift = ref<BaseListResponse<OrderShiftModel>>(getBaseListResponse_DEFAULT())
const route = useRoute()
const handleClick = (tab: TabsPaneContext, event: Event) => {
   console.log(tab, event)
}



// async function getOrderWorkShift() {
//    const [error, response] = await getOrderWorkShift_API(_smena.value.id as string, _itemsShift.value.currentPage - 1)

//    if (error) return
//    _itemsShift.value = response
// }
// getOrderWorkShift()



</script>

<template>
   <div>
      <el-tabs v-model="activeName" class="demo-tabs mt-5" @tab-click="handleClick">
         <el-tab-pane label="product" name="first">
            <AnalitikProduct />
         </el-tab-pane>
         <el-tab-pane label="warehouse" name="second">
            <AnalitikWarehouse />
         </el-tab-pane>
         <el-tab-pane label="store" name="third">
            <AnalitikStore />
         </el-tab-pane>
          <el-tab-pane label="report" name="four">
            <AnalitikReport/>
         </el-tab-pane>
      </el-tabs>
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