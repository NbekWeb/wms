<script lang="ts" setup>
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "@/services/network"
import { type StoreModel, getStore_DEFAULT, createStore_API, updateStore_API, getStores_API } from "@/services/store"
import { getEmployee_DEFAULT, type EmployeeModel, updateEmployee_API, createEmployee_API, getEmployees_API } from "~/services/employee";
import { type WarehouseModel, getWarehouses_API } from '~/services/warehouse';
const _warehouses = ref<BaseListResponse<WarehouseModel>>(getBaseListResponse_DEFAULT())
const _stores = ref<BaseListResponse<StoreModel>>(getBaseListResponse_DEFAULT())

const emit = defineEmits(['update'])

async function loadWarehouses() {
    const [error, response] = await getWarehouses_API()

    if (error) return
    _warehouses.value = response
}

async function loadEmployees() {
    const [error, response] = await getStores_API()

    if (error) return
    _stores.value = response
}

const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<EmployeeModel>(getEmployee_DEFAULT)

function open(item: EmployeeModel) {
    if (item?.id) _formData.value = item
    _visible.value = true
    loadWarehouses()
    loadEmployees()
}

function close() {
    _visible.value = false
}

async function submit() {
    const handler = _formData.value.id ? updateEmployee_API : createEmployee_API
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
        <h2 class="font-commissioner-700 text-3xl">Добавить сотрудника</h2>
        <form class="mt-5 space-y-5" @submit.prevent="submit">
            <BaseInput v-model="_formData.firstname" label="Имя" placeholder="Введите имя" />
            <BaseInput v-model="_formData.lastname" label="Фамилия" placeholder="Введите фамилию" />

            <div>
                <p>Position</p>
                <select v-model="_formData.position">
                    <option value="STACKER">STACKER</option>
                    <option value="SALESMAN">SALESMAN</option>
                </select>
            </div>

            <div>
                <p>Склад</p>
                <select v-model="_formData.warehouseId">
                    <option v-for="item of _warehouses.content" :value="item.id" :key="item.id">{{ item.title }}</option>
                </select>
            </div>

            <div>
                <p>Магазины</p>
                <select v-model="_formData.storeId">
                    <option v-for="item of _stores.content" :value="item.id" :key="item.id">{{ item.title }}</option>
                </select>
            </div>

            <BaseInput v-model="_formData.username" label="Логин" placeholder="Введите логин" />
            <BaseInput v-model="_formData.password" label="Пароль" placeholder="Введите пароль" />

            <button class="bg-primary text-white w-full">Сохранить</button>
        </form>
    </BaseModal>
</template>