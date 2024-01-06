<script lang="ts" setup>
import { type PropType } from 'vue';
import { type WarehouseModel } from '~/services/warehouse';
import { OPEN_DELETE_MODAL } from '@/store';

const emit = defineEmits(['edit', 'update', 'setStore'])
const props = defineProps({
    item: {
        type: Object as PropType<WarehouseModel>,
        required: true
    }
})

function deleteItem() {
    OPEN_DELETE_MODAL({
        // callback: ,
        callback: () => {
            emit('update')
        },
        text: 'Удалить склада',
        // urlni to'g'irlash kk
        url: `warehouses/${props.item.id}`,
        title: `${props.item.title}`,
    })
}
</script>

<template>
    <div class="p-6 block bg-black rounded-2xl">
        <div class="flex items-center justify-between cursor-pointer">
            <span class="text-white text-sm">ID {{ props.item.id }}</span>
            <div class="flex space-x-2">
                <button @click="$emit('edit')" class="p-0">
                    <i class="icon-edit white"></i>
                </button>
                <button @click="deleteItem" class="p-0">
                    <i class="icon-close danger"></i>
                </button>
            </div>
        </div>

        <div class="mt-3">
            <h2 class="font-commissioner-600 text-white text-lg">Название склада</h2>
            <p class="text-sm text-white">{{ item.title }}</p>
        </div>

        <section class="flex items-center justify-between mt-5">
            <div class="mt-5 flex items-center space-x-2">
                <i class="icon-shop white"></i>
                <span class="text-sm text-white font-commissioner-600">{{ item.countOfStores }} магазинов</span>
            </div>

            <div class="space-y-2">
                <NuxtLink :to="`/home/warehouses/${item.id}`" class="p-2 flex items-center rounded-lg justify-center space-x-2 border border-white">
                    <i class="icon-plus white"></i>
                    <span class="text-white">inside</span>
                </NuxtLink>

                <button @click.stop="emit('setStore')" class="flex items-center space-x-2 border border-white">
                    <i class="icon-plus white"></i>
                    <span class="text-white">Добавить</span>
                </button>
            </div>
        </section>
    </div>
</template>

