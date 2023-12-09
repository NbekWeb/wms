<script lang="ts" setup>
import { type PropType } from 'vue';
import { type WarehouseModel } from '~/services/warehouse';
import { OPEN_DELETE_MODAL } from '@/store';

const emit = defineEmits(['edit', 'update'])
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
        text: 'Kuryer',
        // urlni to'g'irlash kk
        url: `warehouses/${props.item.id}`,
        title: `${props.item.title}`,
    })
}
</script>

<template>
    <div class="p-6 bg-black rounded-2xl">
        <div class="flex items-center justify-between cursor-pointer">
            <span class="text-white/60 text-sm">ID {{ props.item.id }}</span>
            <div class="flex space-x-2">
                <img src="@/assets/img/edit.svg" @click="emit('edit')" alt="">
                <img src="@/assets/img/remove.svg" @click="deleteItem" alt="">
            </div>
        </div>

        <div class="mt-3">
            <h2 class="font-commissioner-600 text-white text-lg">Название склада</h2>
            <p class="text-sm text-white/60">{{ item.title }}</p>
        </div>

        <section class="flex items-center justify-between mt-5">
            <div class="mt-5 flex items-center space-x-2">
                <img src="@/assets/img/shops.svg" alt="">
                <span class="text-sm text-white font-commissioner-600">12 магазинов</span>
            </div>

            <button class="flex items-center space-x-2 border border-white">
                <img src="@/assets/img/plus.svg" alt="">
                <span class="text-white">Добавить</span>
            </button>
        </section>
    </div>
</template>