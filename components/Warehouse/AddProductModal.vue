<script lang="ts" setup>
import { Check, Close } from '@element-plus/icons-vue'
import { type WarehouseModel, getWarehouse_DEFAULT, createWarehouse_API, updateWarehouse_API, getWarehouses_API } from "@/services/warehouse"
import { getProductsAutocomplete_API, type ProductModel } from "~/services/product";
import { createInventory_API, type InventoryModel, getInventory_DEFAULT, getInventoryAdd_DEFAULT, type InventoryAddModel } from "~/services/inventory";
import { cryleTitle } from "~/utils/crill"
import { _rules } from './rules'
const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<WarehouseModel>(getWarehouse_DEFAULT)
const _inventory = ref<InventoryAddModel>(getInventoryAdd_DEFAULT())
const links = ref<ProductModel[]>([]);
const _productName = ref<string>('')
const _productPicture = ref<string>('')
const _productUnit = ref<string>('')
const _modalRef = ref()
const route = useRoute()
const emit = defineEmits(['update'])
function open(item: WarehouseModel) {
   if (item?.id) _formData.value = item
   _visible.value = true
}

function close() {
   _formData.value = getWarehouse_DEFAULT()
   _inventory.value = getInventoryAdd_DEFAULT()

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
   const [error, response] = await getProductsAutocomplete_API(cryleTitle(_productName.value));
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
      return link.name.toLowerCase().indexOf(cryleTitle(queryString).toLowerCase()) === 0;
   };
};
const handleSelect = (item: Record<string, any>) => {
   _inventory.value.productId = item.id;
   _inventory.value.warehouseId = route.params.id as string;
   _productName.value = item.name;
   _productPicture.value = item.picture
   _productUnit.value = item.unit
};

defineExpose({
   open
})


</script>

<template>
   <el-dialog class="relative" align-center v-model="_visible" :show-close="false" @close="close" width="600">
      <button @click="close" class="absolute top-4 right-4 p-0">
         <i class="icon-close"></i>
      </button>
      <div>
         <el-form label-position="top">
            <el-form-item class="w-full mt-2" :label="$t('productName')" prop="name">
               <el-autocomplete class="w-full" v-model="_productName" :fetch-suggestions="querySearchAsync"
                  :placeholder="$t('productName')" @select="handleSelect">
                  <template v-slot:default="{ item }">
                     {{ item.name }}
                  </template>
               </el-autocomplete>
            </el-form-item>
         </el-form>
      </div>

      <div class="grid grid-cols-3 max-md:grid-cols-2 gap-5">
         <div class="max-md:hidden bg-[#F4F7FB] p-2 rounded-md col-span-1 flex justify-center items-center">
            <img v-if="_productPicture" src="@/assets/img/product.png" alt="product">
            <p v-else>{{ $t('noImage') }}</p>
         </div>
         <el-form class="grid grid-cols-2 max-sm:grid-cols-1 col-span-2 gap-2 mt-5" label-position="top">
            <el-form-item :label="`$t('amounts') (${_productUnit})`">
               <el-input v-model="_inventory.amount" />
            </el-form-item>
            <el-form-item label="$t('basePrice')">
               <el-input v-model="_inventory.basePrice" />
            </el-form-item> 
            <el-form-item label="$t('sellingPrice')">
               <el-input v-model="_inventory.sellingPrice" />
            </el-form-item>
            <el-form-item label="$t('debt')">
               <el-switch v-model="_inventory.debt" class="mt-2" style="margin-left: 24px" inline-prompt
                  :active-icon="Check" :inactive-icon="Close" />
            </el-form-item>
         </el-form>
      </div>
      <div @click="createInventory" class="flex justify-end">
         <el-button type="primary">{{ $t('add') }}</el-button>
      </div>
   </el-dialog>
</template>