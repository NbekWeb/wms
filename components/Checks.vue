<script setup lang="ts">
import { type ExpenseModel, getExpensesByStoreId_API } from "@/services/expense"
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "~/services/network";

const _items = ref<BaseListResponse<ExpenseModel>>(getBaseListResponse_DEFAULT())


async function loadItems() {
    const [error, response] = await getExpensesByStoreId_API('c7189d5c-c771-417d-83e7-3e88fe18acc8')

    if (error) return
    _items.value = response
}

loadItems()
</script>

<template>
    <div>
        <div class="grid grid-cols-3">
            <CheckCard 
                v-for="item, idx of _items.content"
                :key="idx"
                :item="item"
            />
        </div>

        <div class="flex w-full mt-10 justify-center">
            <button class="h-12 flex items-center bg-black text-white space-x-3">
                <span>Закрыть смену</span>
            </button>
        </div>     
    </div>
</template>