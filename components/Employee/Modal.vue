<script lang="ts" setup>
import { getBaseListResponse_DEFAULT, type BaseListResponse } from "@/services/network"
import { type StoreModel, getStores_API } from "@/services/store"
import { getEmployee_DEFAULT, type EmployeeModel, patchEmployee_API, createEmployee_API, EMPLOYEE_POSITION_ENUM, EMPLOYEE_POSITION } from "~/services/employee";
import { type WarehouseModel, getWarehouses_API } from '~/services/warehouse';
import { _rules } from './rules'

const _warehouses = ref<WarehouseModel[]>([])
const _stores = ref<StoreModel[]>([])
const _modalRef = ref()

const emit = defineEmits(['update'])
const checkedSelect = ref(true)
const _multiSel = ref<string[]>([])

const data = ref([
   {
      value: EMPLOYEE_POSITION_ENUM.STACKER,
      label: EMPLOYEE_POSITION.get(EMPLOYEE_POSITION_ENUM.STACKER),
      children: [
         {
            value: '1-1',
            label: 'Level two 1-1',
         },
      ],
   },
   {
      value: EMPLOYEE_POSITION_ENUM.SALESMAN,
      label: EMPLOYEE_POSITION.get(EMPLOYEE_POSITION_ENUM.SALESMAN),
      children: [
         {
            value: '1-1',
            label: 'Level two 1-1',
         },
      ],
   },
])



async function loadWarehouses() {
   const [error, response] = await getWarehouses_API()

   if (error) return
   _warehouses.value = response
   console.log('_warehouses', _warehouses.value);
   data.value[0].children = _warehouses.value.map((el) => {
      return {
         value: el.id,
         label: el.title,
      }
   })
}

async function loadStores() {
   const [error, response] = await getStores_API()

   if (error) return
   _stores.value = response
   data.value[1].children = _stores.value.map((el) => {
      return {
         value: el.id,
         label: el.title,
      }
   })
}

const _visible = useState(() => false)
const _loading = useState(() => false)
const _formData = useState<EmployeeModel>(getEmployee_DEFAULT)

function open(item: EmployeeModel) {
   if (item?.id) _formData.value = { ...item }
   if (item) {
        checkedSelect.value = false
      _multiSel.value = item.works?.map(el => el.workId)
   }

   _visible.value = true
   loadWarehouses()
   loadStores()
}

function close() {
   _visible.value = false
   _modalRef.value?.resetFields()
   _formData.value = getEmployee_DEFAULT()
   checkedSelect.value = true
   _multiSel.value = []
}
function handleItem() {
   _warehouses.value.forEach((el) => {
      if (_multiSel.value.includes(el.id)) {
         _formData.value.works.push({
            position: EMPLOYEE_POSITION_ENUM.STACKER,
            workId: el.id,
         })
      }
   })
   _stores.value.forEach((el) => {
      if (_multiSel.value.includes(el.id)) {
         _formData.value.works.push({
            position: EMPLOYEE_POSITION_ENUM.SALESMAN,
            workId: el.id,

         })
      }
   })
}

async function submit() {
   _modalRef.value?.validate(async (valid: boolean) => {
      console.log(valid)
      if (valid) {
         await handleItem()
         _loading.value = true
         const handler = _formData.value.id ? patchEmployee_API : createEmployee_API
         const [error, response] = await handler(_formData.value)
         _loading.value = false

         if (error) return
         emit('update')
         close()
         _visible.value = false
         checkedSelect.value = true
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
         {{ _formData.id ? 'Редактировать сотрудника' : 'Добавить сотрудника' }}
      </h2>
      <el-form label-position="top" ref="_modalRef" :model="_formData" :rules="_rules" class="mt-5 space-y-5"
         @submit.prevent="submit">
         <el-form-item label="Имя" prop="firstname">
            <el-input v-model="_formData.firstname" placeholder="Введите имя" />
         </el-form-item>
         <el-form-item label="Фамилия" prop="lastname">
            <el-input v-model="_formData.lastname" placeholder="Введите фамилию" />
         </el-form-item>

         <el-form-item v-if="checkedSelect" class="item" label="Должность">
            <el-tree-select class="w-full" v-model="_multiSel" :data="data" multiple :default-expand-all="true"
               :show-checkbox="checkedSelect">
               <template #default="{ data: { label } }">
                  {{ label }}
               </template>
            </el-tree-select>
         </el-form-item>

         <el-form-item label="Логин" prop="username">
            <el-input v-model="_formData.username" placeholder="Введите логин" />
         </el-form-item>

         <el-form-item label="Пароль" prop="password">
            <el-input v-model="_formData.password" placeholder="Введите пароль" />
         </el-form-item>

         <el-button :loading="_loading" native-type="submit" class="w-full" type="primary">Сохранить</el-button>
      </el-form>
   </el-dialog>
</template>
<style lang="scss">
.item {

   .el-input__wrapper,
   .el-select__wrapper {
      height: auto !important;
      min-height: 3rem !important;
   }
}
</style>