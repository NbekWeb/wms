<script setup lang="ts">
import { deleteItem } from '@/services/network';
import { _deleteModal, CLOSE_DELETE_MODAL } from '@/store';

const _loading = ref(false)

async function submit() {
  _loading.value = true
  const repsonse = await deleteItem(_deleteModal.url)
  _loading.value = false
  
  CLOSE_DELETE_MODAL()
}

// document.addEventListener('keydown', evt => {
//   if (_deleteModal.visible && evt.key === 'Enter') {
//     submit()
//   }
// });

</script>

<template>
    <el-dialog class="relative" align-center v-model="_deleteModal.visible" :show-close="false" width="480">
        <button @click="CLOSE_DELETE_MODAL" class="absolute top-4 right-4 p-0">
            <i class="icon-close"></i>
        </button>
        <h2 class="font-commissioner-700 text-3xl text-primary max-md:text-2xl my-4">            
          {{ _deleteModal.text }}
        </h2>
        <div class="mt-5 space-x-1">
          <span class="text-text">Вы действительно хотите удалить</span>
          <span class="text-primary font-commissioner-600"> {{ _deleteModal.title }}?</span>
        </div>

        <div class="space-y-5 mt-8">
          <el-button :loading="_loading" class="w-full" type="danger" @click="submit">Удалить</el-button>
          <button @click="_deleteModal.visible = false" class="h-12 border w-full border-text text-text font-commissioner-700">Отмена</button>
        </div>
    </el-dialog>
</template>