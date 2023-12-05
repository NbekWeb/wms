<script lang="ts" setup>
import { type StoreModal, getStore_DEFAULT } from "@/services/store"

const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<StoreModel>(getStore_DEFAULT)

function open() {
    console.log("open")
    _visible.value = true
}

function close() {
    _visible.value = false
}

async function submit() {
    _visible.value = false
}

defineExpose({
    open
})
</script>

<template>
    <BaseModal v-model="_visible" @close="close" :loading="_loading" @confirm="submit" width="480px">
        <h2 class="font-commissioner-700 text-3xl">Добавить магазин</h2>
        <form class="mt-5 space-y-5" @submit.prevent="submit">            
            <BaseSelect label="Склад" v-model="_formData.warehouseId" />
            <BaseInput v-model="_formData.title" label="Название магазина" placeholder="Введите название магазина" />            
            <BaseInput v-model="_formData.address" label="Адрес магазина" placeholder="Введите адрес магазина" />

            <button class="bg-primary text-white w-full">Сохранить</button>
        </form>
    </BaseModal>
</template>