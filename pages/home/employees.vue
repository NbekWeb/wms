<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { type EmployeeModel, EMPLOYEE_POSITION, getEmployees_API, EMPLOYEE_POSITION_ENUM } from '@/services/employee';


const _items = ref<BaseListResponse<EmployeeModel>>(getBaseListResponse_DEFAULT())
const _modalRef = ref()
const _assignModalRef = ref()

function openModal(item?: EmployeeModel) {
    _modalRef.value?.open(item)
}

async function loadItems() {
    const [error, response] = await getEmployees_API()

    if (error) return

    _items.value = response
}

function openStoreModal(item: EmployeeModel) {
    _assignModalRef.value?.open(item, EMPLOYEE_POSITION_ENUM.SALESMAN)
}

function openWarehouseModal(item: EmployeeModel) {
    _assignModalRef.value?.open(item, EMPLOYEE_POSITION_ENUM.STACKER)
}

loadItems()
</script>

<template>
    <NuxtLayout name="default">
        <div>
            <EmployeeModal ref="_modalRef" @update="loadItems" />
            <EmployeeAssignModal ref="_assignModalRef" @update="loadItems" />

            <div class="flex items-center justify-between">
                <h2 class="font-commissioner-700 text-4xl">Сотрудники</h2>
                <button @click="openModal()" class="h-12 flex items-center bg-black text-white space-x-3">
                    <i class="icon-plus white"></i>
                    <span>Добавить сотрудника</span>
                </button>
            </div>

            <el-table class="mt-4 w-full" :data="_items.content" border table-layout="auto">
                <el-table-column type="index" width="80" label="#" />
                <el-table-column label="ФАМИЛИЯ И ИМЯ">
                    <template #default="{ row }">
                        <span>{{ row.lastname }}</span>
                        <span>{{ row.firstname }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="ДОЛЖНОСТЬ">
                    <template #default="{ row }">
                        <div class="bg-primary text-white w-fit p-2 rounded-full mx-auto">
                            {{ EMPLOYEE_POSITION.get(row.position) }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="СКЛАД">
                    <template #default="{ row }">                        
                        {{ row.assignedWarehouseName || 'Не назначен' }}
                    </template>
                </el-table-column>

                <el-table-column label="МАГАЗИН">
                    <template #default="{ row }">
                        {{ row.assignedStoreName || 'Не назначен' }}
                    </template>
                </el-table-column>
                <el-table-column label="ЕЩЁ">
                    <template #default="{ row }">
                        <el-dropdown trigger="click">
                            <button class="p-0 bg-black">
                                <img src="@/assets/img/dots.svg"  />
                            </button>

                            <template #dropdown>
                                <div>
                                    <el-dropdown-menu>
                                        <el-dropdown-item v-if="row.position !== EMPLOYEE_POSITION_ENUM.STACKER">
                                            <button
                                                @click="openWarehouseModal(row)"
                                                class="text-white"
                                            >                  
                                                Прикрепить к складу
                                            </button>
                                        </el-dropdown-item>
                                        <el-dropdown-item v-if="row.position !== EMPLOYEE_POSITION_ENUM.SALESMAN">
                                            <button
                                                @click="openStoreModal(row) "
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
        </div>
    </NuxtLayout>
</template>

<style>
.el-dropdown-menu {
    @apply bg-black rounded-xl;
}
</style>