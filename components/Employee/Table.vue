
<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import type { PropType } from 'vue';
import { EMPLOYEE_POSITION, type EmployeeModel } from '~/services/employee';
import type { BaseListResponse } from '~/services/network';

const _shopModalRef = ref()
const _warehouseModalRef = ref()
const _modalRef = ref()

const props = defineProps({
    items: {
        type: Object as PropType<BaseListResponse<EmployeeModel>>,
        required: true
    }
})

function openModal() {
    _modalRef.value?.open()
}

function openShopModal() {
    _shopModalRef.value?.open()
}

function openWarehouseModal() {
    _warehouseModalRef.value?.open()
}
</script>
<template>
    <div class="p-5 bg-[#2222220D] w-full h-full">
        <EmployeeAssignToShopModal ref="_shopModalRef" />
        <EmployeeAssignToWarehouseModal ref="_warehouseModalRef" />
        <BaseInput placeholder="Поиск" bgColor="bg-white" class="w-80" />
        <div class="bg-[#64748B99] w-full flex items-center justify-between p-4 mt-5">
            <div>

            </div>
            <button class="text-white border border-white">Сбросить</button>
        </div>
        <div class="rounded-xl border border-text/20 my-5">
            <table class="w-full h-full">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>ФАМИЛИЯ И ИМЯ</th>
                        <th>ДОЛЖНОСТЬ</th>
                        <th>СКЛАД</th>
                        <th>МАГАЗИН</th>
                        <th>ЕЩЁ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item, idx of props.items.content"> 
                        <td>{{ idx + 1 }}</td>
                        <td>{{ item.lastname }} {{ item.firstname }}</td>
                        <td>
                            <div class="bg-primary text-white w-fit p-2 rounded-full mx-auto">
                                {{ EMPLOYEE_POSITION.get(item.position) }}
                            </div>
                        </td>
                        <td>{{ item.assignedStoreName || 'Не назначен' }}</td>
                        <td>{{ item.assignedWarehouseName || 'Не назначен' }}</td>
                        <td>
                            <Menu as="div" class="relative inline-block text-left">
                                <div>
                                    <MenuButton
                                        class="flex items-center bg-black p-2 space-x-3"
                                    >
                                        <img src="@/assets/img/dots.svg"  />
                                    </MenuButton>
                                </div>
                        
                                <transition
                                    enter-active-class="transition duration-100 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0"
                                >
                                <MenuItems
                                    class="absolute z-20 right-0 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-black shadow-lg ring-1 ring-black/5 focus:outline-none"
                                >
                                    <div>
                                        <MenuItem v-slot="{ active }">
                                            <button
                                                @click="openWarehouseModal"
                                                class="text-white"
                                            >                  
                                                Прикрепить к складу
                                            </button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                            <button
                                                @click="openShopModal"
                                                class="text-white"
                                            >                  
                                                Прикрепить к магазину
                                            </button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                            <button
                                                class="text-white"
                                            >                  
                                                Редактировать
                                            </button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                            <button
                                                class="text-danger"
                                            >                  
                                                Удалить
                                            </button>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                                </transition>
                            </Menu>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
table {
    overflow: hidden;
    border: 1px solid red;
    border-radius: 12px 12px 12px 12px;
    /* @apply border border-text; */
}

table th {
    @apply bg-white py-4 px-2 text-sm text-primary;     
}

table td {
    @apply text-sm py-4 px-2 text-primary text-center;     
}

table tr:nth-child(even){
    @apply bg-white;
}

table tr:nth-child(odd){
    @apply bg-info-main/30;
}


table td {
    @apply !py-3 !px-2;
}

table th:first-child {
    border-radius: 12px 0px 0px 0px;
}

table th:last-child {
    border-radius: 0px 12px 0 0;
}
</style>