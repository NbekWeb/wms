<script lang="ts" setup>
import { type PropType } from 'vue';
import { type StoreModel } from '~/services/store';

const emit = defineEmits(['edit'])
const props = defineProps({
    item: {
        type: Object as PropType<StoreModel>,
        required: true
    }
})
</script>

<template>
    <div class="p-6 bg-[#F9F9F9] rounded-2xl">
        <div class="flex items-center justify-between cursor-pointer">
            <span class="text-black/60 text-sm">ID {{ props.item.id }}</span>
            <img src="@/assets/img/edit-black.svg" @click="$emit('edit')" alt="">
        </div>

        <div class="mt-3">
            <h2 class="font-commissioner-600 text-black text-lg">Название магазина</h2>
            <p class="text-sm text-black/60">{{ props.item.title }}, {{ props.item.address }}</p>
        </div>

        <section class="flex items-center justify-between mt-5">
            <div class="mt-5 flex items-center space-x-2">
                <img src="@/assets/img/user-black.svg" alt="">
                <span class="text-sm text-black font-commissioner-600">12 сотрудников</span>
            </div>

            <button class="flex items-center space-x-2 border border-black ">
                <img src="@/assets/img/plus-black.svg" alt="">
                <span class="text-black font-commissioner-700">Добавить</span>
            </button>
        </section>
    </div>
</template>