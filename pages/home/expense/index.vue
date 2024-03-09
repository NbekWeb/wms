<script setup lang="ts">
import { type ExpenseModel, getExpensesByStoreId_API } from "@/services/expense"
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "~/services/network";

const _items = ref<BaseListResponse<ExpenseModel>>(getBaseListResponse_DEFAULT())
const _modalRef = ref()

async function loadItems() {
    const [error, response] = await getExpensesByStoreId_API('c7189d5c-c771-417d-83e7-3e88fe18acc8')

    if (error) return
    _items.value = response
}

function openModal() {
    _modalRef.value?.open()
}

loadItems()
</script>

<template>
    <div>
        <ExpenseModal @update="loadItems" ref="_modalRef" />
        <div class="flex items-center justify-between">
            <h2 class="font-commissioner-700 text-4xl">Открытие смены</h2>
        </div>

        <div class="grid grid-cols-3">
            <ExpenseCard 
                v-for="item, idx of _items.content"
                :key="idx"
                :item="item"
            />
        </div>

        <div>
            <button @click="openModal" class="h-12 flex items-center bg-black text-white space-x-3 max-sm:w-full max-sm:justify-center">
                <i class="icon-plus white"></i>
                <span>Добавить продукт</span>
            </button>
        </div>
    </div>
</template>

<style>
.el-tabs__item {
    @apply !text-red-300;
}
</style>