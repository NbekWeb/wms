<script lang="ts" setup>
import { type AnalyticStoreResponseModel, postAnalyticStore_API, analyticStore_DEFAULT, type AnalyticProductModel } from "@/services/analytic"
import { getBaseListResponse_DEFAULT, type BaseListResponse, } from "~/services/network";
import { type StoreModel, getStores_API } from '@/services/store';
import { getFileURL_UTIL } from '@/utils/file';
import { formatDate_UTIL } from "@/utils/date";
import { LOAN_STATUS_TR, ORDER_TYPE_TR } from "@/services/shift"
const _items = ref<BaseListResponse<AnalyticProductModel>>(getBaseListResponse_DEFAULT())
const _item = ref<AnalyticStoreResponseModel>(analyticStore_DEFAULT())
const _storeItems = ref<StoreModel[]>([])
const route = useRoute()
const router = useRouter()
const _time = ref([])

async function postAnalyticStore() {
   const [response, error] = await postAnalyticStore_API(_item.value, _items.value.currentPage - 1)

   if (error) return
   _items.value = response
}
postAnalyticStore()

async function loadItems() {
   const [error, response] = await getStores_API()

   if (error) return

   _storeItems.value = response
}

loadItems()

async function handleChange(page: number) {
   _items.value.currentPage = page || 1
   await router.replace({ query: { page } })
   postAnalyticStore();
}

function handleTime() {
   _item.value.start = new Date(_time.value[0]) as any as string
   _item.value.end = new Date(_time.value[1]) as any as string
}

</script>
<template>
   <div>
      <el-form class="grid grid-cols-3 items-end max-lg:grid-cols-2" label-position="top">
         <el-form-item class="col-span-1" label="Магазин" prop="warehouse">
            <el-select class="!w-60" v-model="_item.storeId" placeholder="Select">
               <el-option v-for="item  in _storeItems" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
         </el-form-item>
         <div class="col-span-2 flex gap-5 items-end ml-auto max-lg:ml-0">
            <el-form-item label="vaqt" prop="startDate">
               <el-date-picker class="max-lg:!w-60 max-sm:!w-52" @change="handleTime" v-model="_time" type="datetimerange" start-placeholder="Start date"
                  end-placeholder="End date" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd"
                  time-format="A hh:mm:ss" />
            </el-form-item>
            <el-form-item>
               <el-button @click="postAnalyticStore" type="primary">submit</el-button>
            </el-form-item>
         </div>
      </el-form>
      <div>
         <section class="mt-7">
            <el-table class="w-full tables" :data="_items.content" border table-layout="auto">
               <el-table-column type="index" width="80" label="#" />
          
               <el-table-column label="totalPrice">
                  <template #default="{ row }">
                     <span>{{ row.totalPrice }}</span>
                  </template>
               </el-table-column>
               <el-table-column label="type">
                  <template #default="{ row }">
                     <span>{{ ORDER_TYPE_TR.get(row.type) }}</span>
                  </template>
               </el-table-column>

               <el-table-column width="200" label="loanStatus">
                  <template #default="{ row }">
                     <span>{{ LOAN_STATUS_TR.get(row.loanStatus) }}</span>
                  </template>
               </el-table-column>
               <el-table-column width="200" label="createdDate">
                  <template #default="{ row }">
                     <span>{{ formatDate_UTIL(row.createdDate, false) }}</span>
                  </template>
               </el-table-column>
            </el-table>
            <el-pagination v-if="_items.totalPages > 1" class="mt-8" background :current-page="_items.currentPage"
               layout="prev, pager, next" :total="_items.totalElements" @current-change="handleChange" />
         </section>
      </div>
   </div>
</template>

<style></style>