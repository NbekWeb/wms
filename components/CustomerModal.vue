<script lang="ts" setup>
import { ref } from 'vue';
// import ImgBox from '@/components/ImgBox.vue';
const dialogVisible = ref(false)
import { type PartnerModel, partner_DEFAULT, addPatner_API, updatePatner_API } from "@/services/partner"
const _item = ref<PartnerModel>(partner_DEFAULT())
const _title = ref("Qo'shish")
const emit = defineEmits(['update'])
function open(item: PartnerModel) {
   dialogVisible.value = true
   if (item) {
      _item.value = { ...item }
      _title.value = "Tahrirlash"
   }
}

async function submit() {
   const [response, error] = _item.value.id ? await updatePatner_API(_item.value) : await addPatner_API(_item.value)
   if (error) return
   emit('update')
   dialogVisible.value = false
   _item.value = partner_DEFAULT()
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
                  <!-- <el-form-item>
                     <ImgBox v-model="_item.logoUrl" />
                  </el-form-item> -->
                  <el-form-item label="Hamkor nomi">
                     <el-input v-model="_item.name" />
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