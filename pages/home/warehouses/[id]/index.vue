<script setup lang="ts">
const _warehouseProductModalRef = ref()
const _warehouseProductRealisationModalRef = ref()

function openWarehouseProductModal() {
    _warehouseProductModalRef.value?.open()
}

function openWarehouseProductRealisationModal() {
    _warehouseProductRealisationModalRef.value?.open()
}
</script>

<template>
    <NuxtLayout name="default">
        <WarehouseProductModal ref="_warehouseProductModalRef" />
        <WarehouseProductRealisationModal ref="_warehouseProductRealisationModalRef" />

        <div class="flex items-center justify-between">
            <h2 class="font-commissioner-700 text-4xl">Склады</h2>
            <div class="flex space-x-2">
                <button @click="openWarehouseProductModal()" class="h-12 flex items-center space-x-3 text-black border border-black">
                    <span>Реализация товаров</span>
                </button>
                <button @click="openWarehouseProductRealisationModal()" class="h-12 flex items-center space-x-3 bg-black text-white">
                    <i class="icon-plus white"></i>
                    <span>Добавить</span>
                </button>
            </div>
        </div>

        <el-table class="mt-8 w-full" border table-layout="auto">
                <el-table-column type="index" width="80" label="#" />
                <el-table-column label="ФАМИЛИЯ И ИМЯ">
                    <template #default="{ row }">
                        <span>{{ row.lastname }}</span>
                        <span>{{ row.firstname }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="КОЛ-ВО">
                    <template #default="{ row }">
                        <span>{{ row.lastname }}</span>
                        <span>{{ row.firstname }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="ЗАКУПОЧНАЯ ЦЕНА">
                    <template #default="{ row }">
                        <span>{{ row.lastname }}</span>
                        <span>{{ row.firstname }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="ПРОДАЖНАЯ ЦЕНА">
                    <template #default="{ row }">
                        <span>{{ row.lastname }}</span>
                        <span>{{ row.firstname }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="КОЛ-ВО ПАРТИЙ">
                    <template #default="{ row }">
                        <span>{{ row.lastname }}</span>
                        <span>{{ row.firstname }}</span>
                    </template>
                </el-table-column>
                
                <el-table-column label="ЕЩЁ">
                    <template #default="{ row }">
                        <el-dropdown trigger="click">
                            <button class="bg-black py-1 px-2">
                                <img src="@/assets/img/dots.svg"  />
                            </button>

                            <template #dropdown>
                                <div>
                                    <el-dropdown-menu>
                                        <el-dropdown-item >
                                            <button
                                                class="text-white"
                                            >                  
                                                Прикрепить к складу
                                            </button>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <button
                                                class="text-white"
                                            >                  
                                                Прикрепить к магазину
                                            </button>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <button
                                                class="text-white"
                                            >                  
                                                Редактировать
                                            </button>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <button                                            
                                                class="text-danger"
                                            >                  
                                                Удалить
                                            </button>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </div>
                            </template>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
    </NuxtLayout>
</template>