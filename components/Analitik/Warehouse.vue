<script lang="ts" setup>
import { type AnalyticWarehouseResponseModel, postAnalyticWarehouse_API, analyticWarehouse_DEFAULT, type AnalyticProductModel } from "@/services/analytic"
import { getBaseListResponse_DEFAULT, type BaseListResponse, } from "~/services/network";
import { type WarehouseModel, getWarehouses_API } from '~/services/warehouse';

import { getFileURL_UTIL } from '@/utils/file';

const _items = ref<BaseListResponse<AnalyticWarehouseResponseModel>>(getBaseListResponse_DEFAULT())
const _item = ref<AnalyticWarehouseResponseModel>(analyticWarehouse_DEFAULT())
const _warehouses = ref<WarehouseModel[]>([])

const route = useRoute()
const router = useRouter()
const _time = ref([])

async function postProduct() {
   const [response, error] = await postAnalyticWarehouse_API(_item.value, _items.value.currentPage - 1)

   if (error) return
   console.log('re1sponse', response, );
   
   _items.value = response
}
postProduct()

async function loadWarehouses() {
   const [error, response] = await getWarehouses_API()

   if (error) return
   _warehouses.value = response
}
loadWarehouses()

async function handleChange(page: number) {
   _items.value.currentPage = page || 1
   await router.replace({ query: { page } })
   postProduct();
}

function handleTime() {
   _item.value.start = new Date(_time.value[0]) as any as string
   _item.value.end = new Date(_time.value[1]) as any as string
}

</script>
<template>
   <div>
      <el-form class="flex justify-between items-end" label-position="top">
         <el-form-item label="sklad" prop="warehouse">
            <el-select v-model="_item.warehouseId" placeholder="Select">
               <el-option v-for="item  in _warehouses" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
         </el-form-item>
         <el-form-item label="vaqt" prop="startDate">
            <el-date-picker @change="handleTime" v-model="_time" type="datetimerange" start-placeholder="Start date"
               end-placeholder="End date" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd"
               time-format="A hh:mm:ss" />
         </el-form-item>
      
         <el-form-item>
            <el-button @click="postProduct" type="primary">submit</el-button>
         </el-form-item>
      </el-form>
      <div>{{ _items }}
         <section class="mt-7">
            <el-table class="w-full tables" :data="_items.content" border table-layout="auto">
               <el-table-column type="index" width="80" label="#" />
               <el-table-column label="Изображение продукта">
                  <template #default="{ row }">
                     <div class="!h-16">
                        <img class="bg-cover h-full" :src="getFileURL_UTIL(row.picture)" alt="">
                     </div>
                  </template>
               </el-table-column>
               <el-table-column label="Название продукта">
                  <template #default="{ row }">
                     <span>{{ row.name }}</span>
                  </template>
               </el-table-column>
               <el-table-column label="Единица продукта">
                  <template #default="{ row }">
                     <span>{{ row.unit }}</span>
                  </template>
               </el-table-column>

               <el-table-column label="Выгода">
                  <template #default="{ row }">
                     <span>{{ row.profit }}</span>
                  </template>
               </el-table-column>
               <el-table-column label="Количество">
                  <template #default="{ row }">
                     <span>{{ row.amount }}</span>
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