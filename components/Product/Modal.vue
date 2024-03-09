<script lang="ts" setup>
import { cryleTitle } from "@/utils/crill"
import { _rules } from './rules'
import { getProductRequest_DEFAULT, type ProductModel, type ProductRequestModel, createProduct_API, MEASUREMENT_UNITS, sendProductToModeration_API } from "~/services/product";
import { getCategory_API, type CategoryModel } from "~/services/category"
const _measurementUnitsOptions = Array.from(MEASUREMENT_UNITS, ([name, value]) => ({ name, value }))

const _modalRef = ref()
const _category = ref<CategoryModel[]>([])
const emit = defineEmits(['update'])

const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<ProductRequestModel>(getProductRequest_DEFAULT)

function open() {
   _visible.value = true
}

function close() {
   _visible.value = false
   _modalRef.value?.resetFields()
   _formData.value = getProductRequest_DEFAULT()
}

async function getCategory() {
   const [error, response] = await getCategory_API('')
   
   if (error) return
   _category.value = response
}
getCategory()

async function submit() {
   _modalRef.value?.validate(async (valid: boolean) => {
      if (valid) {
         _loading.value = true
         _formData.value.name = cryleTitle(_formData.value.name)
         const [error, url] = await createProduct_API(_formData.value)
         _loading.value = false

         if (error) return
         emit('update')
         _loading.value = true
         const [error1, response] = await sendProductToModeration_API(url)
         _loading.value = false
         if (error1) return

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
         {{ _formData.id ? 'Редактировать магазина' : 'Добавить продукт' }}
      </h2>
      <el-form :model="_formData" ref="_modalRef" :rules="_rules" label-position="top" class="mt-5 space-y-5"
         @submit.prevent="submit">
         <ImageBox id="main" v-model="_formData.picture" class="w-32 h-32 mx-auto" />

         <el-form-item label="Название продукта" prop="name">
            <el-input v-model="_formData.name" placeholder="Введите Название продукта" />
         </el-form-item>
         <el-form-item label="Тип продукта" prop="type">
            <el-select v-model="_formData.unit" class="w-full">
               <el-option v-for="option of _measurementUnitsOptions" :key="option.value" :label="option.value"
                  :value="option.name" />
            </el-select>
         </el-form-item>
         <el-form-item label="Тип продукта" prop="type">
            <el-select v-model="_formData.categoryId" class="w-full">
               <el-option v-for="option of _category" :key="option.id" :label="option.name" :value="option.id" />
            </el-select>
         </el-form-item>

         <el-button :loading="_loading" native-type="submit" class="w-full" type="primary">Отправить на
            модерацию</el-button>
      </el-form>
   </el-dialog>
</template>