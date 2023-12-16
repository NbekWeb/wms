<script lang="ts" setup>
import { type WarehouseModel, getWarehouse_DEFAULT, createWarehouse_API, updateWarehouse_API } from "@/services/warehouse"
import { _rules } from './rules'

const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<WarehouseModel>(getWarehouse_DEFAULT)

const emit = defineEmits(['update'])
const _modalRef = ref()

function open(item: WarehouseModel) {
    if (item?.id) _formData.value = item
    _visible.value = true
}

function close() {
    _formData.value = getWarehouse_DEFAULT()
    _modalRef.value?.resetFields()
    _visible.value = false
}

async function submit() {
    _modalRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            _loading.value = true
            const handler = _formData.value.id ? updateWarehouse_API : createWarehouse_API
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
    <el-dialog class="relative" align-center v-model="_visible" :show-close="false" @close="close" width="480">
        <button @click="close" class="absolute top-4 right-4 p-0">
            <i class="icon-close"></i>
        </button>
        <h2 class="font-commissioner-700 text-3xl text-primary">            
            {{ _formData.id ? 'Редактировать склада' : 'Добавить склад' }}
        </h2>
        <el-form :rules="_rules" :model="_formData" ref="_modalRef" label-position="top" class="mt-5 space-y-5" @submit.prevent="submit">
            <el-form-item label="Название склада" prop="title">
                <el-input v-model="_formData.title" placeholder="Введите название склада" />
            </el-form-item>
            <el-form-item label="Адрес склада" prop="address">
                <el-input v-model="_formData.address" placeholder="Введите адрес склада" />
            </el-form-item>

            <el-button :loading="_loading" native-type="submit" class="w-full" type="primary">Сохранить</el-button>
        </el-form>
    </el-dialog>
</template>