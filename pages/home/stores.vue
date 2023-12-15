<script lang="ts" setup>
import { type BaseListResponse, getBaseListResponse_DEFAULT } from '~/services/network';
import { type StoreModel, getStores_API } from '@/services/store';

const _items = ref<BaseListResponse<StoreModel>>(getBaseListResponse_DEFAULT())
const _modalRef = ref()

function openModal(item?: StoreModel) {
    console.log("openModal")
    _modalRef.value?.open(item)
}

async function loadItems() {
    const [error, response] = await getStores_API()

    if (error) return

    _items.value = response
}

loadItems()
</script>

<template>
    <NuxtLayout name="default">
        <div>
            <StoreModal @update="loadItems" ref="_modalRef" />
            <div class="flex items-center justify-between">
                <h2 class="font-commissioner-700 text-4xl">Магазины</h2>
                <button @click="openModal()" class="h-12 flex items-center bg-black text-white space-x-3">
                    <i class="icon-plus white"></i>
                    <span>Добавить магазин</span>
                </button>
            </div>
            <div 
                class="grid grid-cols-3 gap-6 mt-8" 
                v-if="_items.content.length > 0"
            >
                <StoreCard 
                    @edit="openModal(item)" 
                    v-for="item of _items.content" 
                    :key="item.id" 
                    :item="item" 
                />
            </div>
            <NoData v-else title="Добавить магазин" @set="openModal()" />
        </div>
    </NuxtLayout>
</template>