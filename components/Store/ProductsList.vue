<script lang="ts" setup>
import { _orderProduct, ORDER_TYPE, postOrder_API, getInventoryAccept_API } from '~/services/inventory';
import { getOrderById_API } from '~/services/shift';
import { ElMessageBox } from 'element-plus'
import { type CustomerModel, customer_DEFAULT, getProductsAutocomplete_API, updateCustomer_API } from "@/services/customer"

const _productName = ref<string>('')

const dialogVisible = ref(false)
const route = useRoute()
const router = useRouter()
const _smena = ref(JSON.parse(route.query.smena as any))

const _checkId = ref(route.query?.checkId || null)

async function postOrder(status: ORDER_TYPE) {
   _orderProduct.value.type = status
   _orderProduct.value.workShiftId = _smena.value.id
   const [error, response] = await postOrder_API(_orderProduct.value)

   if (error) return
   router.push({ path: `/home/stores/${route.params.id}/check`, query: { smena: route.query.smena } })
}
async function getOrderById() {
   const [error, response] = await getOrderById_API(_checkId.value as string)

   if (error) return
   _orderProduct.value.productList = response.products
}
if (_checkId.value) {
   getOrderById()
}
else {
   _orderProduct.value.productList = []
}

function close(ind) {
   _orderProduct.value.productList.splice(ind, 1)
}

const productPrice = computed(() => {
   return _orderProduct.value.productList?.reduce(
      (accumulator, item) => {
         return accumulator + item.amount * (item?.sellingPrice || item?.price)
      }, 0);
})

const links = ref<CustomerModel[]>([]);


async function searchProduct() {
   const [response, error] = await getProductsAutocomplete_API(_productName.value);
   console.log(response);
   if (error) return;

   links.value = response;
   console.log(' links.value', links.value);

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
      return (link.firstname + link.lastname + link.mobile).toLowerCase().indexOf(queryString.toLowerCase()) >= 0;
   };
};
const handleSelect = (item: Record<string, any>) => {
   console.log('item', item);
   _orderProduct.value.regularCustomerId = item.id
   _productName.value = item.firstname
};

function openModal() {
   dialogVisible.value = true;
}
</script>
<template>
   <div class="pr-8">
      <div class="space-y-5">
         <div class="flex items-center justify-between" v-for="item, ind in _orderProduct.productList" :key="ind">
            <div>
               <p class="text-black font-commissioner-600">{{ item.productName || item.name }}</p>
               <div class="flex space-x-5 mt-2">
                  <span class="text-black">{{ item.amount }} {{ item.unit }}</span>
                  <span class="text-text font-commissioner-600">{{ item.amount * (item.sellingPrice || item.price) }}
                     сум</span>
               </div>
            </div>
            <button v-if="!_checkId" @click="close(ind)" class="p-0">
               <i class="icon-close danger"></i>
            </button>
         </div>
      </div>
      <div class="bg-text/20 w-full h-[1px] mt-20" />
      <div class="space-y-6 mt-6">
         <div class="flex justify-between items-center">
            <span class="text-text text-lg">К ОПЛАТЕ:</span>
            <span class="text-black font-commissioner-700 text-2xl">{{ productPrice }} сум</span>
         </div>
         <div v-if="!_checkId" class="flex gap-1">
            <el-button @click="postOrder(ORDER_TYPE.TERMINAL)" type="primary" class="w-full">ТЕРМИНАЛ</el-button>
            <el-button @click="postOrder(ORDER_TYPE.CASH)" type="primary" class="w-full">НАЛИЧНЫЕ</el-button>
            <el-button @click="openModal" type="primary" class="w-full">ДОЛГ</el-button>
         </div>
      </div>
   </div>

   <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <el-form label-position="top">
         <el-form-item class="w-full" label="Maxsulotni nomi" prop="name">
            <el-autocomplete class="w-full" v-model="_productName" :fetch-suggestions="querySearchAsync"
               placeholder="Maxsulotni qidiring" @select="handleSelect">
               <template v-slot:default="{ item }">
                  {{ item.firstname }}
               </template>
            </el-autocomplete>
         </el-form-item>
      </el-form>
      <template #footer>
         <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="postOrder(ORDER_TYPE.LOAN)">
               Confirm
            </el-button>
         </span>
      </template>
   </el-dialog>
</template>