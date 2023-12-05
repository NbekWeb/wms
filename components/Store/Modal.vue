<script lang="ts" setup>
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "@/services/network"
import { type StoreModel, getStore_DEFAULT, createStore_API, updateStore_API } from "@/services/store"
import { type WarehouseModel, getWarehouses_API } from '~/services/warehouse';
const _warehouses = ref<BaseListResponse<WarehouseModel>>(getBaseListResponse_DEFAULT())

const emit = defineEmits(['update'])

async function loadWarehouses() {
    const [error, response] = await getWarehouses_API()

    if (error) return
    _warehouses.value = response
}

const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<StoreModel>(getStore_DEFAULT)

function open(item: StoreModel) {
    if (item?.id) _formData.value = item
    _visible.value = true
    loadWarehouses()
}

function close() {
    _visible.value = false
}

async function submit() {
    const handler = _formData.value.id ? updateStore_API : createStore_API
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
        <h2 class="font-commissioner-700 text-3xl">Добавить магазин</h2>
        <form class="mt-5 space-y-5" @submit.prevent="submit">            
            <div>
                <p>Склад</p>
                <select v-model="_formData.warehouseId">
                    <option v-for="item of _warehouses.content" :value="item.id" :key="item.id">{{ item.title }}</option>
                </select>
            </div>
            <BaseInput v-model="_formData.title" label="Название магазина" placeholder="Введите название магазина" />            
            <BaseInput v-model="_formData.address" label="Адрес магазина" placeholder="Введите адрес магазина" />

            <button class="bg-primary text-white w-full">Сохранить</button>
        </form>
    </BaseModal>
</template>