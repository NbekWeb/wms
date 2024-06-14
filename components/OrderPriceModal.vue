<script lang="ts" setup>
import { getWarehouses_API, type WarehouseModel } from '~/services/warehouse';
import { _distributionProduct } from '~/services/inventory';

const _warehouses = ref<WarehouseModel[]>([])

const _visible = ref(false)
const _sellingPrice = ref('')
const _productId = ref(0)
const emit = defineEmits(['update'])
function open(item: any) {
   loadWarehouses()
   _visible.value = true
   console.log(item);
   _productId.value = item.product.id
   _sellingPrice.value = item.sellingPrice
}
async function submit() {
   if (_distributionProduct.value.sellingPrices.some((el => el.id == _productId.value))) {
      _distributionProduct.value.sellingPrices =  _distributionProduct.value.sellingPrices.map((el) => {
         if (el.id == _productId.value) {
            return {
               id: _productId.value,
               sellingPrice: _sellingPrice.value
            }
         }
         else {
            return el
         }
      })
   }
   else {
      _distributionProduct.value.sellingPrices.push({
         id: _productId.value,
         sellingPrice: _sellingPrice.value
      })
   }
   emit('update', _sellingPrice.value)
   close()
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
         <el-form label-position="top">
            <el-form-item label="цена продажи">
               <el-input type="number" v-model="_sellingPrice" />
            </el-form-item>
         </el-form>
         <template #footer>
            <span class="dialog-footer">
               <el-button @click="_visible = false">Cancel</el-button>
               <el-button type="primary" @click="submit">
                  Сохранить
               </el-button>
            </span>
         </template>
      </el-dialog>
   </div>
</template>