<script lang="ts" setup>
import { type ProductModel, getProduct_DEFAULT } from '~/services/product';
import { acceptProduct_API, rejectProduct_API } from '~/services/moderator'
const _visible = useState(() => false)
const _loading = useState(() => false)
const _item = ref<ProductModel>(getProduct_DEFAULT())
const _title = ref('')
const _rejectedMessage = ref('')
const _isDecline = ref(false)
const emit = defineEmits(['update'])


async function open(payload: ProductModel, isOpen: boolean) {
   _title.value = isOpen ? 'haqiqatdan ham Rad etilsinmi' : 'haqiqatdan ham tasdiqlansinmi'
   _visible.value = true
   _item.value = payload
   _isDecline.value = isOpen
}
async function acceptProduct() {
   const [error, response] = _isDecline.value ? await acceptProduct_API(_item.value.id)
   : await rejectProduct_API(_item.value.id, _rejectedMessage.value)

   if (error) return
   close()
   emit('update')
}

function close() {
   _visible.value = false
}

async function submit() {
   _visible.value = false
   close()
   emit('update')
   _rejectedMessage.value = ''
}

defineExpose({
   open
})
</script>

<template>
   <BaseModal v-model="_visible" @close="close" :loading="_loading" @confirm="submit" width="380px">
      <h2 class="font-commissioner-700 text-xl text-primary mb-3">
         <span class="font-commissioner-700 text-blue-600">{{ _item.name }}</span> {{ _title }}</h2>
       <el-form v-if="_isDecline" label-position="top">
          <el-form-item  label="feedback">
             <el-input v-model="_rejectedMessage" />
          </el-form-item>
       </el-form>
      <div class="flex gap-4 items-end justify-end w-full mt-8">
         <div class="w-40 gap-5 flex">
            <button @click="acceptProduct" class="bg-primary py-2 h-10 text-white w-full">Xa</button>
            <button @click="close" class="bg-danger h-10 py-2 text-white w-full">Yoq</button>
         </div>
      </div>
   </BaseModal>
</template>