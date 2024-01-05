<script setup lang="ts">
const _warehouseProductModalRef = ref()
const _warehouseProductRealisationModalRef = ref()

function openWarehouseProductModal() {
    _warehouseProductModalRef.value?.open()
}

function openWarehouseProductRealisationModal() {
    _warehouseProductRealisationModalRef.value?.open()
}
</script>

<template>
    <NuxtLayout name="default">
        <WarehouseProductModal ref="_warehouseProductModalRef" />
        <WarehouseProductRealisationModal ref="_warehouseProductRealisationModalRef" />

        <div class="flex items-center justify-between">
            <h2 class="font-commissioner-700 text-4xl">Склады</h2>
            <div class="flex space-x-2">
                <button @click="openWarehouseProductModal()" class="h-12 flex items-center space-x-3 text-black border border-black">
                    <span>Реализация товаров</span>
                </button>
                <button @click="openWarehouseProductRealisationModal()" class="h-12 flex items-center space-x-3 bg-black text-white">
                    <i class="icon-plus white"></i>
                    <span>Добавить</span>
                </button>
            </div>
        </div>
    </NuxtLayout>
</template>