<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { type WarehouseModel, getWarehouses_API } from '@/services/warehouse';

const _modalRef = ref()
const _storeModalRef = ref()
const _items = ref<BaseListResponse<WarehouseModel>>(getBaseListResponse_DEFAULT())

function openModal(item?: WarehouseModel) {
    _modalRef.value?.open(item)
}

function openStoreModal(item?: WarehouseModel) {
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
    <NuxtLayout name="default">
        <div>
            <WarehouseModal @update="loadItems" ref="_modalRef" />
            <StoreModal @update="loadItems" ref="_storeModalRef" />
            <div class="flex items-center justify-between">
                <h2 class="font-commissioner-700 text-4xl">Склады</h2>
                <button @click="openModal()" class="h-12 flex items-center space-x-3 bg-black text-white">
                    <i class="icon-plus white"></i>
                    <span>Добавить склад1</span>
                </button>
            </div>

            <div class="grid grid-cols-3 gap-6 mt-8" v-if="_items.content.length > 0">
                <WarehouseCard 
                    @set-store="openStoreModal(item)"
                    @update="loadItems"
                    @edit="openModal(item)"
                    v-for="item of _items.content" 
                    :key="item.title" 
                    :item="item"
                />
            </div>

            <NoData v-else title="Добавить склад" @set="openModal()" />
        </div>
    </NuxtLayout>
</template>