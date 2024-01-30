<script lang="ts" setup>
import { type PropType } from "vue"
import { type ExpenseModel, patchExpenses_API, deleteExpenses_API } from "@/services/expense"
const route = useRoute()
const _smena = ref(JSON.parse(route.query.smena as any))
const emit = defineEmits(['update', 'edit'])
const props = defineProps({
   item: {
      type: Object as PropType<ExpenseModel>,
      required: true
   }
})

async function deleteItem() {
   const [error, response] = await deleteExpenses_API(props.item.id as number)
   if (error)
      console.log('dff');

   emit('update')
}
async function editItem() {
   emit('edit', props.item)
}

</script>

<template>
   <div class="flex justify-between items-start p-4 space-y-2 border border-text/20 overflow-hidden">
      <div>
         <p class="text-text/80">{{ formatDate_UTIL(props.item.createdDate, false) }}</p>

         <div class="space-x-2 py-2">
            <span class="font-commissioner-600 text-primary">Расход № {{ props.item.id }}</span>
            <span class="font-commissioner-600 text-text">{{ props.item.amount }} UZS</span>
         </div>
         <div class="space-x-2 flex">
            <span class="font-commissioner-600 text-primary">Комментарий:</span>
            <span class="font-commissioner-600 text-text">{{ props.item.comment }}</span>
         </div>
      </div>
      <div v-if="!_smena.closedDate" class="flex space-x-2">
         <button @click.stop="editItem" class="p-0">
            <i class="icon-edit "></i>
         </button>
         <button @click.stop="deleteItem" class="p-0">
            <i class="icon-close danger"></i>
         </button>
      </div>
   </div>
</template>