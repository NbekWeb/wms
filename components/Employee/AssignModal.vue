<script lang="ts" setup>
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "@/services/network"
import { getEmployee_DEFAULT, type EmployeeModel, EMPLOYEE_POSITION_ENUM, assignEmployee_API } from '~/services/employee';
import { type StoreModel, getStores_API } from "@/services/store"
import { type WarehouseModel, getWarehouses_API } from '~/services/warehouse';

const _visible = useState(() => false)
const _loading = useState(() => false)

const _warehouses = ref<WarehouseModel[]>([])
const _stores = ref<StoreModel[]>([])

const _formData = useState<EmployeeModel>(getEmployee_DEFAULT)
const _position = useState<EMPLOYEE_POSITION_ENUM>(() => EMPLOYEE_POSITION_ENUM.SALESMAN)

const emit = defineEmits(['update'])

async function loadWarehouses() {
    const [error, response] = await getWarehouses_API()

    if (error) return
    _warehouses.value = response

    if (response) _formData.value.workId = response?.[0]?.id
}

async function loadStores() {
    const [error, response] = await getStores_API()

    if (error) return

    _stores.value = response
    if (response) _formData.value.workId = response?.[0]?.id
}

function open(payload: EmployeeModel, position: EMPLOYEE_POSITION_ENUM) {
    _visible.value = true
    _formData.value = payload

    _position.value = position
    if (position === EMPLOYEE_POSITION_ENUM.SALESMAN) loadStores()
    else if (position === EMPLOYEE_POSITION_ENUM.STACKER) loadWarehouses()
}

function close() {
    _visible.value = false
}

async function submit() {
    _visible.value = false

    _formData.value.position = _position.value
    _loading.value = true
    const [error, response] = await assignEmployee_API(_formData.value)
    _loading.value = false
    
    if (error) return

    close()
    emit('update')
}

defineExpose({
    open
})
</script>

<template>
    <BaseModal v-model="_visible" @close="close" :loading="_loading" @confirm="submit" width="480px">
        <h2 class="font-commissioner-700 text-3xl text-primary">
            {{ _position === EMPLOYEE_POSITION_ENUM.STACKER ? "Прикрепить к складу" : "Прикрепить к магазину" }}
        </h2>
        <div class="flex items-center space-x-2 mt-5">
            <span class="text-text">Сотрудник</span>
            <span class="text-primary font-commissioner-600">: {{ _formData.lastname }} {{ _formData.firstname }} </span>
        </div>
        <el-form label-position="top" class="mt-5 space-y-5" @submit.prevent="submit">
            <el-form-item label="Склад" prop="warehouse" v-if="_position === EMPLOYEE_POSITION_ENUM.STACKER">
                <el-select class="w-full" v-model="_formData.workId">
                    <el-option v-for="item of _warehouses" :key="item.id" :label="item.title" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="Магазин" prop="warehouse" v-else-if="_position === EMPLOYEE_POSITION_ENUM.SALESMAN">
                <el-select class="w-full" v-model="_formData.workId">
                    <el-option v-for="item of _stores" :key="item.id" :label="item.title" :value="item.id" />
                </el-select>
            </el-form-item>

            <button class="bg-primary h-12 text-white w-full">Сохранить</button>
        </el-form>
    </BaseModal>
</template>