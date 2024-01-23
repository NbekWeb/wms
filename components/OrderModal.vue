<script lang="ts" setup>
import { _distributionProduct, postOrderReceive_API } from '~/services/inventory';
import { getWarehouses_API, type WarehouseModel } from '~/services/warehouse';
const _warehouses = ref<WarehouseModel[]>([])

const _visible = ref(false)
const _warehouseId = ref('')
const route = useRoute()
function open() {
   loadWarehouses()
   _visible.value = true
}
async function submit() {
   const [error, response] = await postOrderReceive_API(+route.params.id as number, _distributionProduct.value)

   if (error) return
   close()
   _distributionProduct.value.sellingPrices = []
}
async function loadWarehouses() {
   const [error, response] = await getWarehouses_API()

   if (error) return
   _warehouses.value = response
}
loadWarehouses()

function close() {
   _visible.value = false
}
defineExpose({
   open
})
</script>

<template>
   <div>
      <el-dialog v-model="_visible" title="Tips" width="30%" :before-close="close">
         <span>Выбрать склад</span>
         <el-form label-position="top">
            <el-form-item label="Склад" prop="warehouseId">
               <el-select class="w-full" v-model="_distributionProduct.warehouseId">
                  <el-option v-for="item of _warehouses" :key="item.id" :label="item.title" :value="item.id" />
               </el-select>
            </el-form-item>
         </el-form>
         <template #footer>
            <span class="dialog-footer">
               <el-button @click="_visible = false">Cancel</el-button>
               <el-button type="primary" @click="submit">
                  submit
               </el-button>
            </span>
         </template>
      </el-dialog>

   </div>
</template>