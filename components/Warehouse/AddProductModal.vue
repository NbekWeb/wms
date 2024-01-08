<script lang="ts" setup>
import { Check, Close } from '@element-plus/icons-vue'
import { type WarehouseModel, getWarehouse_DEFAULT, createWarehouse_API, updateWarehouse_API, getWarehouses_API } from "@/services/warehouse"
import { getProductsAutocomplete_API, type ProductModel } from "~/services/product";
import { createInventory_API, type InventoryModel, getInventory_DEFAULT, getInventoryAdd_DEFAULT, type InventoryAddModel } from "~/services/inventory";
import { _rules } from './rules'
const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<WarehouseModel>(getWarehouse_DEFAULT)
const _inventory = ref<InventoryAddModel>(getInventoryAdd_DEFAULT())
const links = ref<ProductModel[]>([]);
const _productName = ref<string>('')
const _productPicture = ref<string>('')
const _modalRef = ref()
const route = useRoute()
const emit = defineEmits(['update'])
function open(item: WarehouseModel) {
   if (item?.id) _formData.value = item
   _visible.value = true
}

function close() {
   _formData.value = getWarehouse_DEFAULT()
   _modalRef.value?.resetFields()
   _visible.value = false
}

// async function submit() {
//    _modalRef.value?.validate(async (valid: boolean) => {
//       if (valid) {
//          _loading.value = true
//          const handler = _formData.value.id ? updateWarehouse_API : createWarehouse_API
//          const [error, response] = await handler(_formData.value)
//          _loading.value = false

//          if (error) return
//          emit('update')

//          _visible.value = false
//       }
//    })
// }

async function createInventory() {
   const [error, response] = await createInventory_API(_inventory.value)

   if (error) return
   emit('update')
   close()
}
async function searchProduct() {
   const [error, response] = await getProductsAutocomplete_API(_productName.value);
   if (error) return;
   links.value = response;
}

let timeout: ReturnType<typeof setTimeout>;

async function querySearchAsync(queryString: string, cb: (arg: any) => void) {
   if (queryString.length > 2) {
      await searchProduct();
   }
   const results = queryString
      ? links.value?.filter(createFilter(queryString))
      : links.value;

   clearTimeout(timeout);
   timeout = setTimeout(() => {
      cb(results);
   }, 300 * Math.random());
}
function createFilter(queryString: string) {
   return (link: any) => {
      return link.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
   };
};
const handleSelect = (item: Record<string, any>) => {
   _inventory.value.productId = item.id;
   _inventory.value.warehouseId = route.params.id as string;
   _productName.value = item.name;
   _productPicture.value = item.picture
};

defineExpose({
   open
})
</script>

<template>
   <el-dialog class="relative" align-center v-model="_visible" :show-close="false" @close="close" width="580">
      <button @click="close" class="absolute top-4 right-4 p-0">
         <i class="icon-close"></i>
      </button>
      <div>
         <el-form label-position="top">
            <el-form-item class="w-full" label="Maxsulotni nomi" prop="name">
               <el-autocomplete class="w-full" v-model="_productName" :fetch-suggestions="querySearchAsync"
                  placeholder="Maxsulotni qidiring" @select="handleSelect">
                  <template v-slot:default="{ item }">
                     {{ item.name }}
                  </template>
               </el-autocomplete>
            </el-form-item>
         </el-form>
      </div>

      <div class="grid grid-cols-3 gap-5">
         <div class=" bg-[#F4F7FB] p-2 rounded-md col-span-1 flex justify-center items-center">
            <img v-if="_productPicture" src="@/assets/img/product.png" alt="product">
            <p v-else>No image</p>
         </div>
         <el-form class="grid grid-cols-2 col-span-2 gap-2 mt-5" label-position="top">
            <el-form-item label="КОЛИЧЕСТВО">
               <el-input v-model="_inventory.amount" />
            </el-form-item>
            <el-form-item label="basePrice">
               <el-input v-model="_inventory.basePrice" />
            </el-form-item>
            <el-form-item label="debt">
               <el-switch v-model="_inventory.debt" class="mt-2" style="margin-left: 24px" inline-prompt
                  :active-icon="Check" :inactive-icon="Close" />
            </el-form-item>
         </el-form>
      </div>
      <div @click="createInventory" class="flex justify-end">
         <el-button type="primary">Qo'shish</el-button>
      </div>
      <div class="grid grid-cols-2 gap-5 mt-8">
         <div class="bg-info p-4 rounded-lg">
            <p class="text-xl font-commissioner-600 text-black">1 партия</p>
            <div class="flex space-x-2">
               <span class="text-text">Дата:</span>
               <span class="text-black font-commissioner-600">13 октября 2023</span>
            </div>
            <div class="flex space-x-2">
               <span class="text-text">Кол-во:</span>
               <span class="text-black font-commissioner-600">200 ед</span>
            </div>
         </div>
         <div class="bg-info p-4 rounded-lg">
            <p class="text-xl font-commissioner-600 text-black">2 партия</p>
            <div class="flex space-x-2">
               <span class="text-text">Дата:</span>
               <span class="text-black font-commissioner-600">13 октября 2023</span>
            </div>
            <div class="flex space-x-2">
               <span class="text-text">Кол-во:</span>
               <span class="text-black font-commissioner-600">200 ед</span>
            </div>
         </div>
         <div class="bg-info p-4 rounded-lg">
            <p class="text-xl font-commissioner-600 text-black">3 партия</p>
            <div class="flex space-x-2">
               <span class="text-text">Дата:</span>
               <span class="text-black font-commissioner-600">13 октября 2023</span>
            </div>
            <div class="flex space-x-2">
               <span class="text-text">Кол-во:</span>
               <span class="text-black font-commissioner-600">200 ед</span>
            </div>
         </div>
      </div>
   </el-dialog>
</template>