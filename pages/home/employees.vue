<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { type EmployeeModel, getEmployees_API } from '@/services/employee';

const _items = ref<BaseListResponse<EmployeeModel>>(getBaseListResponse_DEFAULT())
const _modalRef = ref()

function openModal(item?: EmployeeModel) {
    console.log("openModal")
    _modalRef.value?.open(item)
}

async function loadItems() {
    const [error, response] = await getEmployees_API()

    if (error) return

    _items.value = response
}

loadItems()
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