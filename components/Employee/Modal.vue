<script lang="ts" setup>
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "@/services/network"
import { type StoreModel, getStores_API } from "@/services/store"
import { getEmployee_DEFAULT, type EmployeeModel, updateEmployee_API, createEmployee_API, EMPLOYEE_POSITION_ENUM} from "~/services/employee";
import { type WarehouseModel, getWarehouses_API } from '~/services/warehouse';
import { _rules } from './rules'

const _warehouses = ref<BaseListResponse<WarehouseModel>>(getBaseListResponse_DEFAULT())
const _stores = ref<BaseListResponse<StoreModel>>(getBaseListResponse_DEFAULT())
const _modalRef = ref()

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
    _modalRef.value?.validate(async (valid: boolean) => {
        console.log(valid)
        if (valid) {
            const handler = _formData.value.id ? updateEmployee_API : createEmployee_API
            const [error, response] = await handler(_formData.value)

            if (error) return
            emit('update')

            _visible.value = false
        }
    })
}

defineExpose({
    open
})
</script>

<template>
    <el-dialog align-center v-model="_visible" :show-close="false" @close="close" width="480">
        <button @click="close" class="absolute top-4 right-4 p-0">
            <i class="icon-close"></i>
        </button>
        <h2 class="font-commissioner-700 text-3xl text-primary">Добавить сотрудника</h2>
        <el-form label-position="top" ref="_modalRef" :model="_formData" :rules="_rules" class="mt-5 space-y-5" @submit.prevent="submit">            
            <el-form-item label="Имя" prop="firstname">
                <el-input v-model="_formData.firstname" placeholder="Введите имя" />
            </el-form-item>
            <el-form-item label="Фамилия" prop="lastname">
                <el-input v-model="_formData.lastname" placeholder="Введите фамилию" />
            </el-form-item>
            
            <el-form-item label="Position" prop="position">
                <el-select class="w-full" v-model="_formData.position">
                    <el-option :value="EMPLOYEE_POSITION_ENUM.STACKER">STACKER</el-option>
                    <el-option :value="EMPLOYEE_POSITION_ENUM.SALESMAN">SALESMAN</el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Wareouse" prop="warehouse" v-if="_formData.position === EMPLOYEE_POSITION_ENUM.STACKER">
                <el-select class="w-full" v-model="_formData.workId">
                    <el-option v-for="item of _warehouses.content" :key="item.id" :label="item.title" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="store" prop="warehouse" v-else>
                <el-select class="w-full" v-model="_formData.workId">
                    <el-option v-for="item of _stores.content" :key="item.id" :label="item.title" :value="item.id" />
                </el-select>
            </el-form-item>

            <el-form-item label="Логин" prop="username">
                <el-input v-model="_formData.username" placeholder="Введите логин" />
            </el-form-item>

            <el-form-item label="Пароль" prop="password">
                <el-input v-model="_formData.password" placeholder="Введите пароль" />
            </el-form-item>

            <el-button native-type="submit" class="w-full" type="primary">Сохранить</el-button>
        </el-form>
    </el-dialog>
</template>