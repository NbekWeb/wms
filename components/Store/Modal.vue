<script lang="ts" setup>
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "@/services/network"
import { type StoreModel, getStore_DEFAULT, createStore_API, updateStore_API } from "@/services/store"
import { type WarehouseModel, getWarehouses_API } from '~/services/warehouse';
import { _rules } from './rules'

const _warehouses = ref<WarehouseModel[]>([])
const _modalRef = ref()

const emit = defineEmits(['update'])

async function loadWarehouses() {
    const [error, response] = await getWarehouses_API()
    
    if (error) return
    _warehouses.value = response
}

const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<StoreModel>(getStore_DEFAULT)

function open(item: StoreModel, warehouseId: string) {
   loadWarehouses()
   console.log('itemwwwwwww', item);
   
    if (item?.id) _formData.value = item
    if (warehouseId) _formData.value.warehouseId = warehouseId

    _visible.value = true
   }
   loadWarehouses()

function close() {
    _visible.value = false
    _modalRef.value?.resetFields()
    _formData.value = getStore_DEFAULT()
}

async function submit() {
    _modalRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            _loading.value = true
            const handler = _formData.value.id ? updateStore_API : createStore_API
            const [error, response] = await handler(_formData.value)
            _loading.value = false

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
        <h2 class="font-commissioner-700 text-3xl text-primary max-md:text-2xl my-4">            
            {{ _formData.id ? 'Редактировать магазина' : 'Добавить магазин' }}
        </h2>
        <el-form :model="_formData" ref="_modalRef" :rules="_rules" label-position="top" class="mt-5 space-y-5" @submit.prevent="submit">            
            <el-form-item label="Склад" prop="warehouseId">
                <el-select class="w-full" v-model="_formData.warehouseId">
                    <el-option v-for="item of _warehouses" :key="item.id" :label="item.title" :value="item.id" />
                </el-select>
            </el-form-item>

            <el-form-item label="Название магазина" prop="title">
                <el-input v-model="_formData.title" placeholder="Введите название склада" />
            </el-form-item>
            <el-form-item label="Адрес магазина" prop="address">
                <el-input v-model="_formData.address" placeholder="Введите адрес склада" />
            </el-form-item>

            <el-button :loading="_loading" native-type="submit" class="w-full" type="primary">Сохранить</el-button>
        </el-form>
    </el-dialog>
</template>