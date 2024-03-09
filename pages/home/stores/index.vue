<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { type StoreModel, getStores_API } from '@/services/store';

const _items = ref<StoreModel[]>([])
const _modalRef = ref()
const _employeeModalRef = ref()

function openModal(item?: StoreModel) {
    _modalRef.value?.open(item)
}

function openEmployeeModal(item?: StoreModel) {
    _employeeModalRef.value?.open(null, item?.id)
}

async function loadItems() {
    const [error, response] = await getStores_API()

    if (error) return

    _items.value = response
}

loadItems()
</script>

<template>
    <div>
        <StoreModal @update="loadItems" ref="_modalRef" />
        <EmployeeModal @update="loadItems" ref="_employeeModalRef" />
        <div class="flex items-center justify-between max-sm:flex-col max-md:items-start max-sm:gap-y-4">
            <h2 class="font-commissioner-700 text-4xl">Магазины</h2>
            <button @click="openModal()" class="h-12 flex items-center bg-black text-white space-x-3 max-sm:w-full max-sm:justify-center max-sm:w-full max-sm:justify-center">
                <i class="icon-plus white"></i>
                <span>Добавить магазин</span>
            </button>
        </div>
        <div 
            class="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6 mt-8" 
            v-if="_items.length > 0">
            <StoreCard 
                @set-employee="openEmployeeModal"
                @edit="openModal(item)"
                @update="loadItems" 
                v-for="item of _items" 
                :key="item.id" 
                :item="item" 
            />
        </div>
        <NoData v-else title="Добавить магазин" @set="openModal()" />
    </div>
</template>