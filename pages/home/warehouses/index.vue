<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { type WarehouseModel, getWarehouses_API } from '@/services/warehouse';

const _modalRef = ref()
const _storeModalRef = ref()
const _items = ref<WarehouseModel[]>([])

function openModal(item?: WarehouseModel) {
   _modalRef.value?.open(item)
}

async function openStoreModal(item?: WarehouseModel) {
   _storeModalRef.value?.open(null, item?.id)
}

async function loadItems() {
   const [error, response] = await getWarehouses_API()

   if (error) return

   _items.value = response
}

loadItems()
</script>

<template>
      <div>
         <WarehouseModal @update="loadItems" ref="_modalRef" />
         <StoreModal @update="loadItems" ref="_storeModalRef" />
         <div class="flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-y-4">
            <h2 class="font-commissioner-700 text-4xl">{{ $t('warehouses') }}</h2>
            <button @click="openModal()" class="h-12 flex items-center space-x-3 bg-black text-white max-sm:w-full max-sm:justify-center">
               <i class="icon-plus white"></i>
               <span>{{ $t('addWareHouse') }}</span>
            </button>
         </div>
         <div class="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1  gap-6 mt-8" v-if="_items.length > 0">
            <WarehouseCard @set-store="openStoreModal(item)" @update="loadItems" @edit="openModal(item)"
               v-for="item of _items" :key="item.title" :item="item" />
         </div>

         <NoData v-else :title="$t('addWareHouse')" @set="openModal()" />
      </div>
</template>