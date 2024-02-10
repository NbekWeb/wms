<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { type ExpenseModel, getExpensesByStoreId_API } from "@/services/expense"
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "~/services/network";

const activeName = ref('first')
const _items = ref<BaseListResponse<ExpenseModel>>(getBaseListResponse_DEFAULT())
const _modalRef = ref()

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

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

        <div class="flex space-x-8 border-b border-b-text/20 pb-2">
            <NuxtLink to="check" class="tab">
                Чеки
            </NuxtLink>
            <NuxtLink to="expense" class="tab">
                Расходы
            </NuxtLink>
        </div>

        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="Чеки" name="first">
                <div class="grid grid-cols-3">
                    <CheckCard 
                        v-for="item, idx of _items.content"
                        :key="idx"
                        :item="item"
                    />
                </div>

                <div>
                    <button @click="openModal" class="h-12 flex items-center bg-black text-white space-x-3">
                        <i class="icon-plus white"></i>
                        <span>Добавить продукт</span>
                    </button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Расходы" name="second">Расходы</el-tab-pane>
        </el-tabs>        
    </div>
</template>

<style>
.tab {
    @apply !p-0 !text-black !bg-white !relative;
}

.router-link-exact-active {
    @apply !font-commissioner-600;
}

.router-link-exact-active::after {
    @apply !font-commissioner-600 bg-black;
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 2px;
}
</style>