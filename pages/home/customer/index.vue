<script lang="ts" setup>
import { ref } from 'vue';
import { getCustomers_API, deleteCustomer_API, type CustomerModel, getLoanCustomer_API } from "@/services/customer"
import { axiosInstance, type BaseListResponse, } from '~/services/network'



const _partnerRef = ref()
const _items = ref<CustomerModel[]>([])
const _totalLoan = ref<number>(0)
function openModal(item?: CustomerModel) {
   _partnerRef.value.open(item)
}
async function getCustomer() {
   const [response, error] = await getCustomers_API()
   if (error) return
   _items.value = response
}
getCustomer()

async function getLoanCustomer() {

   const [response, error] = await getLoanCustomer_API()
   if (error) return
   _totalLoan.value = response
}
getLoanCustomer()

async function deletePartner(item: CustomerModel) {
   const [response, error] = await deleteCustomer_API(item.id as string)
   if (error) return
   getCustomer()
}

</script>

<template>
   <div>
      <customers-modal @update="getCustomer" ref="_partnerRef" />
      <h1 class="text-3xl font-commissioner-700 mb-4 max-sm:font-commissioner-600 max-sm:text-2xl">{{ $t('totalDebt') }}: {{ _totalLoan.toLocaleString() }} {{ $t('summ') }}</h1>
      <div class="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1  gap-5">
         <div @click="openModal(undefined)"
            class="cursor-pointer bg-gray rounded-2xl p-5 flex justify-center items-center flex-col">
            <!-- <img src="@/assets/img/add.svg" alt=""> -->
            <i class="ri-add-line text-gray2 text-3xl"></i>
            <h3>{{ $t('RegularCustomer') }}</h3>
         </div>
         <div @click="$router.push(`/home/customer/${item.id}`)" class="bg-gray rounded-xl p-5 cursor-pointer"
            v-for="item in _items.content" :key="item.id">

            <div class="flex justify-between">
               <div>
                  <p class="font-montserrat-500 text-lg mb-2">{{ item.firstname + ' ' + item.lastname }}</p>
                  <h2 class="font-commissioner-600 mb-3">{{ item.mobile }}</h2>
                  <h2 class="font-commissioner-600 mb-3">{{ item.totalLoan.toLocaleString() }} {{ $t('summ') }}</h2>
               </div>

               <div class="flex gap-2 justify-end">
                  <button @click.stop="openModal(item)" class="p-0">
                     <i class="icon-edit "></i>
                  </button>
                  <button @click.stop="deletePartner(item)" class="p-0">
                     <i class="icon-close danger"></i>
                  </button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<style></style>