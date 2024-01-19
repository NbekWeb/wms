<script lang="ts" setup>
import { getFileURL_UTIL } from '@/utils/file';
import { type ProductModel } from '~/services/product';
import { getInventoriesByWarehouseId_API, type InventoryModel, _orderProduct } from '~/services/inventory';

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
const _productStore = computed(() => {
   return { ...props.item }
})

function close() {
   _visible.value = false
}

async function openModal() {
   _visible.value = true
}
async function sendProduct() {
   _orderProduct.value.productList?.push(Object.assign(_productStore.value, { amount: _addStore.value.amount }))
   close()
}

</script>

<template>
   <div class="rounded-2xl border border-info-main bg-info p-5 space-y-4">
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
         <p>Tovarlarning umumiy miqdori: <span class="font-commissioner-600">{{ item.amount }} {{ item.unit }}</span></p>
         <el-form label-position="top">
            <el-form-item :label="`amount(${_productStore.unit})`" prop="warehouse">
               <el-input-number :max="item.amount" v-model="_addStore.amount" />
            </el-form-item>
            <el-form-item class="w-full">
               <el-button @click="sendProduct" class="w-full" type="primary">Qo'shish</el-button>
            </el-form-item>
         </el-form>
      </el-dialog>
   </div>
</template>