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
            <EmployeeModal ref="_modalRef" />
            <div class="flex items-center justify-between">
                <h2 class="font-commissioner-700 text-4xl">Сотрудники</h2>
                <button @click="openModal()" class="flex items-center bg-black text-white">
                    <img src="@/assets/img/plus.svg" alt="plus">
                    <span>Добавить сотрудника</span>
                </button>
            </div>

            <div class="mt-8">
                <EmployeeTable />
            </div>
        </div>
    </NuxtLayout>
</template>