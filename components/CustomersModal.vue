<script lang="ts" setup>
import { ref } from 'vue';
const dialogVisible = ref(false)
import { type CustomerModel, customer_DEFAULT, addCustomer_API, updateCustomer_API } from "@/services/customer"
const _item = ref<CustomerModel>(customer_DEFAULT())
const _title = ref("Qo'shish")
const emit = defineEmits(['update'])

function open(item: CustomerModel) {
   dialogVisible.value = true
   if (item) {
      _item.value = { ...item }
      _title.value = "Tahrirlash"
   }
}

async function submit() {
   const [response, error] = _item.value.id ? await updateCustomer_API(_item.value) : await addCustomer_API(_item.value)
   if (error) return
   emit('update')
   dialogVisible.value = false
   _item.value = customer_DEFAULT()
}

defineExpose({
   open
})
</script>
<template>
   <div>
      <el-dialog v-model="dialogVisible" :title="_title" width="500px">
         <template #footer>
            <span class="dialog-footer">
               <el-form label-position="top">
                  <el-form-item label="Ism">
                     <el-input v-model="_item.firstname" />
                  </el-form-item>
                  <el-form-item label="Familiya">
                     <el-input v-model="_item.lastname" />
                  </el-form-item>
                  <el-form-item label="Telfon nomer">
                     <el-input v-model="_item.mobile" />
                  </el-form-item>
               </el-form>
               <div class="mt-10">
                  <el-button @click="dialogVisible = false">Bekor qilish</el-button>
                  <el-button type="danger" @click="submit">
                     Saqlash
                  </el-button>
               </div>
            </span>
         </template>
      </el-dialog>
   </div>
</template>

<style></style>