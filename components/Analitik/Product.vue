<script lang="ts" setup>
import { type AnalyticProductResponseModel, postAnalyticProduct_API, analyticProduct_DEFAULT, type AnalyticProductModel } from "@/services/analytic"
import { getBaseListResponse_DEFAULT, type BaseListResponse, } from "~/services/network";
import { type StoreModel, getStores_API } from '@/services/store';
import { getFileURL_UTIL } from '@/utils/file';

const _items = ref<BaseListResponse<AnalyticProductResponseModel>>(getBaseListResponse_DEFAULT())
const _item = ref<AnalyticProductModel>(analyticProduct_DEFAULT())
const _storeItems = ref<StoreModel[]>([])
const route = useRoute()
const router = useRouter()
const _time = ref([])
const _sort = ref<any>(null)
const _sortOptions = ref([
   {
      type: "bestselling",
      label: "бестселлер",
      value: "bestselling"
   },
   {
      type: "bestselling",
      label: "не бестселлер",
      value: "notBestselling"
   },
   {
      type: "profitable",
      label: "прибыльный",
      value: "profitable"
   },
   {
      type: "profitable",
      label: "не прибыльный",
      value: "notProfitable"
   },
])

async function postProduct() {
   const [response, error] = await postAnalyticProduct_API(_item.value, _items.value.currentPage - 1)

   if (error) return
   _items.value = response
}
postProduct()

async function loadItems() {
   const [error, response] = await getStores_API()

   if (error) return

   _storeItems.value = response
}

loadItems()

async function handleChange(page: number) {
   _items.value.currentPage = page || 1
   await router.replace({ query: { page } })
   postProduct();
}

function handleTime() {
   _item.value.start = new Date(_time.value[0]) as any as string
   _item.value.end = new Date(_time.value[1]) as any as string
}
function changeSort() {
   console.log(_sort.value);
   if (_sort.value.type == "bestselling") {
      _item.value.bestselling = _sort.value.value == "bestselling" ? true : false
      _item.value.profitable = null
   }
   else {
      _item.value.profitable = _sort.value.value == "profitable" ? true : false
      _item.value.bestselling = null
   }
}
</script>
<template>
   <div>
      <el-form class="grid grid-cols-3 max-2xl:grid-cols-2 gap-x-6" label-position="top">
         <el-form-item label="Магазин" prop="warehouse">
            <el-select class="!w-60" v-model="_item.storeId" placeholder="Select">
               <el-option v-for="item  in _storeItems" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
         </el-form-item>
         
         <el-form-item label="vaqt" prop="startDate">
            <el-date-picker @change="handleTime" v-model="_time" type="datetimerange" start-placeholder="Start date"
               end-placeholder="End date" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD ddd"
               time-format="A hh:mm:ss" />
         </el-form-item>
         <div class="flex gap-4 items-end">
            <el-form-item label="Saralash">
               <el-select class="!w-60 max-md:!w-48" @change="changeSort" v-model="_sort" placeholder="Select">
                  <el-option v-for="item  in _sortOptions" :key="item.label" :label="item.label" :value="item" />
               </el-select>
            </el-form-item>
            <el-form-item>
               <el-button class="" @click="postProduct" type="primary">submit</el-button>
            </el-form-item>
         </div>
      </el-form>
      <div>
         <section class="mt-7">
            <el-table class="w-full tables" :data="_items.content" border table-layout="auto">
               <el-table-column type="index" width="50" label="#" />
               <el-table-column label="Изображение продукта">
                  <template #default="{ row }">
                     <div class="!h-16">
                        <img v-if="row.picture" class="bg-cover h-full" :src="getFileURL_UTIL(row.picture)" alt="">
                     </div>
                  </template>
               </el-table-column>
               <el-table-column width="280px" label="Название продукта">
                  <template #default="{ row }">
                     <span>{{ row.name }}</span>
                  </template>
               </el-table-column>
               <el-table-column width="180px" label="Единица продукта">
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