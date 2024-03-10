<script lang="ts" setup>
import { getEmployee_DEFAULT, type EmployeeModel, EMPLOYEE_POSITION, EMPLOYEE_POSITION_ENUM, assignEmployee_API } from '~/services/employee';
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
   _formData.value.works = _formData.value.works.
      filter((el) => el.position == EMPLOYEE_POSITION_ENUM.STACKER).
      map(item => item.workId)
   const [error, response] = await getWarehouses_API()

   if (error) return
   _warehouses.value = response

   if (response) _formData.value.workId = response?.[0]?.id
}

async function loadStores() {
   _formData.value.works = _formData.value.works.
      filter((el) => el.position == EMPLOYEE_POSITION_ENUM.SALESMAN).
      map(item => item.workId)
   const [error, response] = await getStores_API()

   if (error) return
   _stores.value = response
   if (response) _formData.value.workId = response?.[0]?.id
}

function open(payload: EmployeeModel, position: EMPLOYEE_POSITION_ENUM) {
   _formData.value = payload

   _position.value = position
   if (position === EMPLOYEE_POSITION_ENUM.SALESMAN) loadStores()
   else if (position === EMPLOYEE_POSITION_ENUM.STACKER) loadWarehouses()
   _visible.value = true
}

function close() {
   _visible.value = false
   emit('update')
}

function handleItem() {
   _formData.value.works = _formData.value.works.map((el) => {
      return {
         workId: el,
         position: _position.value
      }
   })
}

async function submit() {
   _visible.value = false
   await handleItem()

   _loading.value = true
   const [error, response] = await assignEmployee_API(_formData.value)
   _loading.value = false

   if (error) return

   close()
}

defineExpose({
   open
})
</script>

<template>
   <BaseModal class="modal" v-model="_visible" @close="close" :loading="_loading" @confirm="submit" width="480px">
      <h2 class="font-commissioner-700 text-3xl text-primary max-md:text-2xl my-4">
         {{ _position === EMPLOYEE_POSITION_ENUM.STACKER ? "Прикрепить к складу" : "Прикрепить к магазину" }}
      </h2>
      <div class="flex items-center space-x-2 mt-5">
         <span class="text-text">{{ $t('employee') }}</span>
         <span class="text-primary font-commissioner-600">: {{ _formData.lastname }} {{ _formData.firstname }} </span>
      </div>
      <el-form label-position="top" class="mt-5 space-y-5" @submit.prevent="submit">
         <el-form-item :label="$t('warehouse')" prop="warehouse" v-if="_position === EMPLOYEE_POSITION_ENUM.STACKER">
            <el-select class="w-full" v-model="_formData.works" multiple >
               <el-option v-for="item  in _warehouses" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
         </el-form-item>
         <el-form-item :label="$t('store1')" prop="warehouse" v-else-if="_position === EMPLOYEE_POSITION_ENUM.SALESMAN">
            <el-select class="w-full" v-model="_formData.works" multiple >
               <el-option v-for="item  in _stores" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
         </el-form-item>

         <button class="bg-primary h-12 text-white w-full">{{ $t('save') }}</button>
      </el-form>
   </BaseModal>
</template>
<style lang="scss">
.modal {

   .el-input__wrapper,
   .el-select__wrapper {
      min-height: 3rem !important;
      height: auto !important;
   }
}
</style>