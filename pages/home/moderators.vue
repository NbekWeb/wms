<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { getProductsByStatus_API, PRODUCT_STATUS_ENUM, type ProductModel } from "@/services/product"

const _items = ref<BaseListResponse<ProductModel>>(getBaseListResponse_DEFAULT())
const _modalRef = ref()
const _assignModalRef = ref()
const _status = ref<PRODUCT_STATUS_ENUM>(PRODUCT_STATUS_ENUM.ACCEPTED)
const _search = ref('')

async function loadItems() {
    const [error, response] = await getProductsByStatus_API(PRODUCT_STATUS_ENUM.REJECTED)

    if (error) return

    _items.value = response
}

loadItems()
</script>

<template>
    <NuxtLayout name="default">
        <div>
            <EmployeeModal ref="_modalRef" @update="loadItems" />
            <EmployeeAssignModal ref="_assignModalRef" @update="loadItems" />

            <div class="flex items-center justify-between">
                <h2 class="font-commissioner-700 text-4xl">Продукты</h2>
            </div>

            <section class="mt-8 ">
                <div class="w-80">
                    <el-input class="!bg-white" v-model="_search" placeholder="Поиск" />
                </div>                
                <div class="flex items-center justify-between mt-5 bg-text/60 p-5">
                    <el-select v-model="_status">
                        <el-option label="Принятый" :value="PRODUCT_STATUS_ENUM.ACCEPTED" />
                        <el-option label="Инициализировано" :value="PRODUCT_STATUS_ENUM.INITIALIZED" />
                        <el-option label="На модерации" :value="PRODUCT_STATUS_ENUM.MODERATION" />
                        <el-option label="Отклоненный" :value="PRODUCT_STATUS_ENUM.REJECTED" />
                    </el-select>

                    <button class="border border-white text-white text-sm font-commissioner-700">Сбросить</button>
                </div>

                <el-table class="w-full" :data="_items.content" border table-layout="auto">
                    <el-table-column type="index" width="80" label="#" />
                    <el-table-column label="Изображение продукта">
                        <template #default="{ row }">
                            <span>{{ row.picture }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Название продукта">
                        <template #default="{ row }">
                            <span>{{ row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Тип продукта">
                        <template #default="{ row }">
                            <span>{{ row.type }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="Статус">
                        <template #default="{ row }">
                            <span>{{ row.status }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Действие">
                        <template #default="{ row }">
                            <span>{{ row.status }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </section>            
        </div>
    </NuxtLayout>
</template>

<style>
.el-dropdown-menu {
    @apply bg-black rounded-xl;
}
.el-dropdown-menu__item:focus, .el-dropdown-menu__item:active, .el-dropdown-menu__item:hover {
    @apply !bg-transparent;
    /* @apply !bg-black; */
}
</style>