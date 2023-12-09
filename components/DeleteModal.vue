<script setup lang="ts">
import { useRouter } from 'vue-router';
import { deleteItem } from '@/services/network';
import { _deleteModal, CLOSE_DELETE_MODAL } from '@/store';

const router = useRouter()

async function submit() {
  const repsonse = await deleteItem(_deleteModal.url)
  if (_deleteModal.callback === undefined) {
    router.go(-1)
  }
  
  CLOSE_DELETE_MODAL()
}

// document.addEventListener('keydown', evt => {
//   if (_deleteModal.visible && evt.key === 'Enter') {
//     submit()
//   }
// });

</script>

<template>
    <el-dialog v-model="_deleteModal.visible" width="400">
        <div class="flex flex-col mb-8">
            <p class="text-lg font-semibold text-red-500">Diqqat, {{_deleteModal.text}}ni o‘chirishga aminmisiz?</p>
            <p class="text-base leading-4 py-1.5 break-words">{{_deleteModal.title}}</p>
        </div>

        <div class="flex items-center gap-3">
            <el-button type="danger" @click="submit">Delete</el-button>
            <el-button @click="_deleteModal.visible = false">Cancel</el-button>
        </div>
    </el-dialog>
</template>