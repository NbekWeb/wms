<script lang="ts" setup>
import { type PropType } from 'vue';
import { type StoreModel } from '~/services/store';
import { OPEN_DELETE_MODAL } from '@/store';

const emit = defineEmits(['edit', 'update', 'setEmployee'])
const props = defineProps({
   item: {
      type: Object as PropType<StoreModel>,
      required: true
   }
})

function deleteItem() {
   OPEN_DELETE_MODAL({
      // callback: ,
      callback: () => {
         emit('update')
      },
      text: 'Удалить магазина',
      // urlni to'g'irlash kk
      url: `stores/${props.item.id}`,
      title: `${props.item.title}`,
   })
}
</script>

<template>
   <div @click.stop="$router.push(`/home/stores/${item.id}`)" class="p-6 cursor-pointer bg-black rounded-2xl">
      <div class="flex items-center justify-between cursor-pointer">
         <h2 class="font-commissioner-600 text-white text-lg">Название магазина</h2>
         <div class="flex space-x-2">
            <button @click.stop="$emit('edit')" class="p-0">
               <i class="icon-edit white"></i>
            </button>
            <button @click.stop="deleteItem" class="p-0">
               <i class="icon-close danger"></i>
            </button>
         </div>
      </div>

      <div class="mt-3">
         <p class="text-sm text-white">{{ props.item.title }}, {{ props.item.address }}</p>
      </div>

      <section class="flex items-center justify-between mt-5">
         <div class="mt-5 flex items-center space-x-2">
            <i class="icon-shop white"></i>
            <span class="text-sm text-white font-commissioner-600">{{ props.item.countOfEmployees }} сотрудников</span>
         </div>

         <button @click.stop="emit('setEmployee', props.item)" class="flex items-center space-x-2 border border-white">
            <i class="icon-plus white"></i>
            <span class="text-white font-commissioner-700">Добавить</span>
         </button>
      </section>
   </div>
</template>