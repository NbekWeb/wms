<script lang="ts" setup>
import { type WarehouseModel, getWarehouse_DEFAULT, createWarehouse_API, updateWarehouse_API } from "@/services/warehouse"
const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<WarehouseModel>(getWarehouse_DEFAULT)

const emit = defineEmits(['update'])
function open(item: WarehouseModel) {
    if (item?.id) _formData.value = item
    _visible.value = true
}

function close() {
    _visible.value = false
}

async function submit() {
    const handler = _formData.value.id ? updateWarehouse_API : createWarehouse_API
    const [error, response] = await handler(_formData.value)

    if (error) return
    emit('update')

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