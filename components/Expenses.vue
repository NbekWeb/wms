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

        <div class="grid grid-cols-3">
            <ExpenseCard 
                v-for="item, idx of _items.content"
                :key="idx"
                :item="item"
            />
        </div>

        <div class="flex justify-center w-full mt-10">
            <button @click="openModal" class="h-12 flex items-center bg-black text-white space-x-3">
                <i class="icon-plus white"></i>
                <span>Добавить расход</span>
            </button>
        </div>
    </div>
</template>