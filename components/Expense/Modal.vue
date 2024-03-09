
<script lang="ts" setup>
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "@/services/network"
import { type StoreModel, getStore_DEFAULT, createStore_API, updateStore_API } from "@/services/store"
import { type WarehouseModel, getWarehouses_API } from '~/services/warehouse';
import { _rules } from './rules'
import { type ExpenseModel, getExpense_DEFAULT, createExpense_API, patchExpenses_API } from '~/services/expense';

const emit = defineEmits(['update'])
const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<ExpenseModel>(getExpense_DEFAULT)
const _modalRef = ref()
const route = useRoute()
const _smena = ref(JSON.parse(route.query.smena as string))
function open(item: any) {
   _formData.value = { ...item }
   _visible.value = true
   _formData.value.workShiftId = _smena.value?.id as number
}

function close() {
   _visible.value = false
   _modalRef.value?.resetFields()
   _formData.value = getExpense_DEFAULT()
}

async function submit() {
   _modalRef.value?.validate(async (valid: boolean) => {
      if (valid) {
         _loading.value = true
         const [error, response] = _formData.value?.id ? await patchExpenses_API(_formData.value) : await createExpense_API(_formData.value)
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
         {{ _formData.id ? 'Редактировать расхода' : 'Добавление расхода' }}
      </h2>
      <el-form :model="_formData" ref="_modalRef" :rules="_rules" label-position="top" class="mt-5 space-y-5"
         @submit.prevent="submit">
         <el-form-item label="Сумма расхода" prop="amount">
            <el-input type="number" v-model="_formData.amount" placeholder="Введите сумму" />
         </el-form-item>
         <el-form-item label="Комментарий" prop="comment">
            <el-input type="textarea" :rows="5" v-model="_formData.comment" placeholder="Введите комментарий" />
         </el-form-item>

         <el-button :loading="_loading" native-type="submit" class="w-full" type="primary">Сохранить</el-button>
      </el-form>
   </el-dialog>
</template>