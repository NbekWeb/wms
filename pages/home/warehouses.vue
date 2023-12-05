<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { type WarehouseModel, getWarehouses_API } from '@/services/warehouse';
const _modalRef = ref()
const _items = ref<BaseListResponse<WarehouseModel>>(getBaseListResponse_DEFAULT())

function openModal(item?: WarehouseModel) {
    console.log("openModal")
    _modalRef.value?.open(item)
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
            <div class="flex items-center justify-between">
                <h2 class="font-commissioner-700 text-4xl">Склады</h2>
                <button @click="openModal()" class="flex items-center bg-black text-white">
                    <img src="@/assets/img/plus.svg" alt="plus">
                    <span>Добавить склад</span>
                </button>
            </div>

            <div class="grid grid-cols-3 gap-6 mt-8">
                <WarehouseCard 
                    @edit="openModal(item)"
                    v-for="item of _items.content" 
                    :key="item.title" 
                    :item="item"
                />
            </div>
        </div>
    </NuxtLayout>
</template>