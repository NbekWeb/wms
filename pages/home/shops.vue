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
            <ShopModal ref="_modalRef" />
            <div class="flex items-center justify-between">
                <h2 class="font-commissioner-700 text-4xl">Магазины</h2>
                <button @click="openModal()" class="flex items-center bg-black text-white">
                    <img src="@/assets/img/plus.svg" alt="plus">
                    <span>Добавить магазин</span>
                </button>
            </div>

            <div class="grid grid-cols-3 gap-6 mt-8">
                <ShopCard v-for="i of 4" />
            </div>
        </div>
    </NuxtLayout>
</template>