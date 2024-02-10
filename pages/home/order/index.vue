<script lang="ts" setup>
import { getOrderFetch_API } from '~/services/inventory'
import { getFileURL_UTIL } from '@/utils/file';

const _items = ref<any>([])
const _modalRef = ref()
const _assignModalRef = ref()
const _declineModalRef = ref()
const _search = ref('')
const _status = ref('')
const router = useRouter()

async function loadItems() {
   const [error, response] = await getOrderFetch_API()
   if (error) return

   _items.value = response
}
loadItems()
</script>
<template>
   <div>
      <div>
         <EmployeeModal ref="_modalRef" @update="loadItems" />
         <EmployeeAssignModal ref="_assignModalRef" @update="loadItems" />
         <div class="flex items-center justify-between">
            <h2 class="font-commissioner-700 text-4xl">Заказы поставки</h2>
         </div>

         <section class="mt-8 ">
            <div class="w-80">
               <el-input class="!bg-white" v-model="_search" placeholder="Поиск" />
            </div>
            <div class="flex items-center justify-between mt-5 bg-text/60 p-5">
               <el-select v-model="_status" @change="loadItems">
                  <el-option label="Принятый" :value="1" />
                  <el-option label="Инициализировано" :value="2" />
               </el-select>

               <button class="border border-white text-white text-sm font-commissioner-700">Сбросить</button>
            </div>

            <el-table class="w-full tables" :data="_items.results" border table-layout="auto">
               <el-table-column type="index" width="80" label="№" />
               <el-table-column label="ПОСТАВЩИК">
                  <template #default="{ row }">
                     <div>
                        <router-link :to="{ path: `/home/order/${row.id}`, query: { order: JSON.stringify(row) } }">
                           {{ row?.agent?.external_name }}</router-link>
                     </div>
                  </template>
               </el-table-column>
               <el-table-column label="СТАТУС">
                  <template #default="{ row }">
                     <el-button class="!h-8" type="primary">{{ !row.registered_by_the_client ?
                        'Новый' : 'Старый' }}</el-button>
                  </template>
               </el-table-column>
               <el-table-column label="СУММА">
                  <template #default="{ row }">
                     <span>{{ row.total_summa + ' ' + row.currency }}</span>
                  </template>
               </el-table-column>

               <el-table-column label="КОЛ-ВО ТОВАРОВ">
                  <template #default="{ row }">
                     <span>{{ row?.order_products?.length }}</span>
                  </template>
               </el-table-column>
               <el-table-column label="ЕЩЁ">
                  <template #default="{ row }">
                     <div class="flex gap-1 justify-center items-center">
                        <img src="@/assets/img/menu.svg" alt="">
                     </div>
                  </template>
               </el-table-column>
            </el-table>
         </section>
      </div>
   </div>
</template>

<style></style>