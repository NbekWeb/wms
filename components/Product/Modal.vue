<script lang="ts" setup>
import { _rules } from './rules'
import { getProduct_DEFAULT, type ProductModel, createProduct_API } from "~/services/product";

const _modalRef = ref()

const emit = defineEmits(['update'])

const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<ProductModel>(getProduct_DEFAULT)

function open() {
    _visible.value = true
}

function close() {
    _visible.value = false
    _modalRef.value?.resetFields()
    _formData.value = getProduct_DEFAULT()
}

async function submit() {
    _modalRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            _loading.value = true
            const [error, response] = await createProduct_API(_formData.value)
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
        <h2 class="font-commissioner-700 text-3xl text-primary">            
            {{ _formData.id ? 'Редактировать магазина' : 'Добавить продукт' }}
        </h2>
        <el-form :model="_formData" ref="_modalRef" :rules="_rules" label-position="top" class="mt-5 space-y-5" @submit.prevent="submit">            
            <ImageBox id="main" v-model="_formData.picture" class="w-32 h-32 mx-auto" />

            <el-form-item label="Название продукта" prop="name">
                <el-input v-model="_formData.name" placeholder="Введите Название продукта" />
            </el-form-item>
            <el-form-item label="Тип продукта" prop="type">
                <el-input v-model="_formData.type" placeholder="Введите Тип продукта" />
            </el-form-item>

            <el-button :loading="_loading" native-type="submit" class="w-full" type="primary">Отправить на модерацию</el-button>
        </el-form>
    </el-dialog>
</template>