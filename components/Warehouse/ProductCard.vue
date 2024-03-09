<script lang="ts" setup>
import { getFileURL_UTIL } from '@/utils/file';
import { type InventoryModel, type InventoryProductPartModel, _sendProduct, getInventoryProductPart_API } from '~/services/inventory';
import { formatDate_UTIL } from '~/utils/date';

const _ProductPart = ref<InventoryProductPartModel[]>([])
const _addStore = ref<any>({})
const router = useRouter()
const route = useRoute()
const _visible = ref(false)
const emit = defineEmits(['edit', 'update', 'setEmployee'])
const props = defineProps({
   item: {
      type: Object as PropType<InventoryModel>,
      required: true
   }
})
_addStore.value = props.item

function close() {
   _visible.value = false
}

async function getInventoryProductPart() {
   const [error, response] = await getInventoryProductPart_API(route?.params?.id as string, props.item.productId)
   console.log('response', response);

   if (error) return
   _ProductPart.value = response
}

// getInventoryProductPart()
async function openModal() {
   _visible.value = true
   await getInventoryProductPart()
   _addStore.value.id = _ProductPart.value[0].id
   _ProductPart.value[0].isPart = true
}
async function sendProduct() {
   if (_sendProduct.value.inventories.some(((el: any) => el.productId == _addStore.value.productId))) {
      _sendProduct.value.inventories = _sendProduct.value.inventories.map((el: any) => {
         if (el.productId == _addStore.value.productId) {
            return {
               ..._addStore.value
            }
         }
         else {
            return el
         }
      })
   }
   else {
      _sendProduct.value.inventories.push({ ..._addStore.value })
   }
   close()
}

function handlePart(item: InventoryProductPartModel) {
   _ProductPart.value = _ProductPart.value.map((el: any) => {
      el.isPart = false
      if (el.id == item.id) {
         el.isPart = !el?.isPart
         _addStore.value.id = item.id
      }
      return el
   })
}
</script>

<template>
   <div class="rounded-2xl border border-info-main bg-info p-5 space-y-4 max-md:p-3 max-md:space-y-3">
      <p class="font-commissioner-600 h-12 text-black text-center text-sm">{{ item.productName }}</p>
      <img class="w-24 h-24 object-cover mx-auto" v-if="item?.picture" :src="getFileURL_UTIL(item?.picture)" alt="">
      <div class="h-24 rounded flex justify-center items-center bg-white" v-else>
         No image
      </div>
      <!-- <img src="@/assets/img/product.png" alt="product" class="w-24 h-24 object-cover mx-auto"> -->
      <p class="text-center font-commissioner-600 text-black text-xl">{{ item.sellingPrice }} сум </p>
      <button @click="openModal" class="h-10 w-full justify-center flex items-center space-x-3 bg-black text-white">
         <i class="icon-plus white"></i>
         <span>Добавить</span>
      </button>

      <el-dialog class="relative" align-center v-model="_visible" :show-close="false" @close="close" width="450">
         <button @click="close" class="absolute top-4 right-4 p-0">
            <i class="icon-close"></i>
         </button>
         <h2 class="font-commissioner-700 text-xl text-primary mb-4">
            {{ item.productName }}
         </h2>
         <el-form label-position="top">
            <!-- <el-form-item label="Магазин" prop="warehouse">
            <el-select class="w-full" v-model="_sendProduct.storeId">
               <el-option v-for="item of _stores" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
         </el-form-item>  -->
            <el-form-item label="amount" prop="warehouse">
               <el-input v-model="_addStore.amount" />
            </el-form-item>
            <el-form-item class="w-full">
               <el-button @click="sendProduct" class="w-full" type="primary">Qo'shish</el-button>
            </el-form-item>
         </el-form>
         <div class="grid grid-cols-2 gap-5 mt-8">
            <div v-for="item, ind in _ProductPart" :key="item.id" @click="handlePart(item)"
               :class="{ 'border border-primary': item?.isPart }" class="bg-info p-4 rounded-lg">
               <p class="text-xl font-commissioner-600 text-black">{{ ind + 1 }} партия</p>
               <div class="flex space-x-2">
                  <span class="text-text">Дата:</span>
                  <span class="text-black font-commissioner-600">{{ formatDate_UTIL(item.createdDate, false) }}</span>
               </div>
               <div class="flex space-x-2">
                  <span class="text-text">Кол-во:</span>
                  <span class="text-black font-commissioner-600">{{ item.amount + ' ' + item.unit }}</span>
               </div>
            </div>
         </div>
      </el-dialog>
   </div>
</template>