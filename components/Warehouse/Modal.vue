<script lang="ts" setup>
import { type WarehouseModel, getWarehouse_DEFAULT } from "@/services/warehouse"
const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<WarehouseModel>(getWarehouse_DEFAULT)

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
        <h2 class="font-commissioner-700 text-3xl">Добавить склад</h2>
        <form class="mt-5 space-y-5" @submit.prevent="submit">
            <BaseInput v-model="_formData.title" label="Название склада" placeholder="Введите название склада" />
            <BaseInput v-model="_formData.address" label="Адрес склада" placeholder="Введите адрес склада" />

            <button class="bg-primary text-white w-full">Сохранить</button>
        </form>
    </BaseModal>
</template>