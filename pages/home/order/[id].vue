<script lang="ts" setup>
import { _distributionProduct } from '~/services/inventory';
const _orderRef = ref()
const _orderPriceRef = ref()
const router = useRouter()
const route = useRoute()
const _deliveryOrder = ref<any>(JSON.parse(route.query.order))

function openModal() {
   _orderRef.value.open()
}
function sellingPriceModal(item: any) {
   _orderPriceRef.value.open(item)
}
</script>

<template>
   <NuxtLayout>
      <OrderModal ref="_orderRef" />
      <OrderPriceModal ref="_orderPriceRef" />
      <div>
         <div @click="router.go(-1)" class="flex gap-1">
            <img src="@/assets/img/icon.svg" alt="">
            <h3>Назад к списку</h3>
         </div>
         <div class="flex gap-6 items-center">
            <h1 class="text-[40px] font-commissioner-700">Заказ № {{ _deliveryOrder.id }}</h1>
            <el-button style="height: 28px!important;" class="!!h-6 !px-1" type="primary">{{
               !_deliveryOrder.registered_by_the_client ?
               'Новый' : 'Старый' }}</el-button>
         </div>
         <h2 class="font-commissioner-700 text-2xl my-4 mt-7">Общая информация</h2>
         <div class="p-5 border border-[#64748B]/20 rounded-2xl ">
            <div>
               <el-form label-position="top" class=" max-w-[670px] w-full">
                  <div class="grid grid-cols-2 gap-x-6 gap-y-1">
                     <el-form-item label="Общая сумма">
                        <el-input v-model="_deliveryOrder.total_summa" />
                     </el-form-item>
                     <el-form-item label="Сумма скидки">
                        <el-input v-model="_deliveryOrder.discount_summa" />
                     </el-form-item>
                     <el-form-item label="Сумма после скидки">
                        <el-input v-model="_deliveryOrder.total_summa_after_discount" />
                     </el-form-item>
                     <el-form-item label="Валюта">
                        <el-input v-model="_deliveryOrder.currency" />
                     </el-form-item>
                  </div>

                  <el-form-item label="Комментарий" prop="comment">
                     <el-input type="textarea" :rows="5" v-model="_deliveryOrder.comment"
                        placeholder="Текст комментария" />
                  </el-form-item>

                  <div class="grid grid-cols-2 gap-x-6 gap-y-1">
                     <el-form-item label="Клиент">
                        <el-input v-model="_deliveryOrder.client.fullname" />
                     </el-form-item>
                     <el-form-item label="Агент">
                        <el-input v-model="_deliveryOrder.agent.external_name" />
                     </el-form-item>
                     <el-form-item label="Тип оплаты">
                        <el-input v-model="_deliveryOrder.payment_type.external_name" />
                     </el-form-item>
                     <el-form-item label="Направление торговли">
                        <el-input v-model="_deliveryOrder.trade.external_name" />
                     </el-form-item>
                  </div>
                  <el-checkbox v-model="_deliveryOrder.registered_by_the_client" label="Выдан со склада" size="large" />
                  <el-form-item label="Комментарий выдачи со склада" prop="comment">
                     <el-input type="textarea" :rows="5" v-model="_deliveryOrder.wh_expenditure_comment"
                        placeholder="Текст комментария" />
                  </el-form-item>
               </el-form>
            </div>
         </div>
         <div>
            <h2 class="font-commissioner-700 text-2xl my-4 mt-7">Товары в заказе</h2>
         </div>
         <el-table class="w-full tables" :data="_deliveryOrder.order_products" border table-layout="auto">
            <el-table-column type="index" width="80" label="#" />
            <el-table-column label="ПРОДУКТ">
               <template #default="{ row }">
                  <div>
                     <p>{{ row.product.name }}</p>
                  </div>
               </template>
            </el-table-column>
            <el-table-column label="КОЛИЧЕСТВО">
               <template #default="{ row }">
                  <p>{{ row.quantity }}</p>
               </template>
            </el-table-column>
            <el-table-column label="ЦЕНА">
               <template #default="{ row }">
                  <span>{{ row.price }}</span>
               </template>
            </el-table-column>

            <el-table-column label="СКИДКА">
               <template #default="{ row }">
                  <span>{{ row.discount || '-' }}</span>
               </template>
            </el-table-column>
            <el-table-column label="СУММА">
               <template #default="{ row }">
                  <p>{{ row.summa }}</p>
               </template>
            </el-table-column>
            <el-table-column label="цена продажи">
               <template #default="{ row }">
                  <el-button @click="sellingPriceModal(row)" style="height: 28px!important;" class="!!h-6 !px-4"
                     type="primary">цена продажи</el-button>
               </template>
            </el-table-column>
         </el-table>
         <div class="mt-8 flex justify-center items-center">
            <el-button @click="openModal" type="primary">Выбрать склад</el-button>
         </div>
      </div>
   </NuxtLayout>
</template>