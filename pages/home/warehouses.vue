<script lang="ts" setup>
const _modalRef = ref()
function openModal() {
    console.log("openModal")
    _modalRef.value?.open()
}
</script>

<template>
    <NuxtLayout name="default">
        <div>
            <WarehouseModal ref="_modalRef" />
            <h2 class="font-commissioner-700 text-4xl">Склады</h2>

            <div class="grid grid-cols-3 gap-6">
                <WarehouseCard v-for="i of 4" />
            </div>

            <div class="flex items-center w-full">
                <div class="w-96 mx-auto">
                    <img src="@/assets/img/noData.svg" alt="noData">
                    <h2 class="text-3xl text-text font-commissioner-700 mt-2 text-center">Здесь пока пусто</h2>

                    <button @click="openModal()" class="flex items-center bg-black text-white space-x-2 mx-auto mt-8">
                        <img src="@/assets/img/plus.svg" alt="plus">
                        <span>Добавить склад</span>
                    </button>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>