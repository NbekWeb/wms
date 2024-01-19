<script setup lang="ts">
import { type ExpenseModel, getExpensesByStoreId_API } from "@/services/expense"
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "~/services/network";

const _items = ref<BaseListResponse<ExpenseModel>>(getBaseListResponse_DEFAULT())
const _modalRef = ref()
const route = useRoute()
const _smena = ref(JSON.parse(route.query?.smena as any))

async function loadItems() {
    const [error, response] = await getExpensesByStoreId_API(_smena.value.id)

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