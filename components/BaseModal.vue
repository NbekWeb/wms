<script lang="ts" setup>
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    modelValue: {
        type: Boolean,
        required: true,
        default: false
   },
   
    closeOutsideClick: {
        type: Boolean,
        default: false
    },
    width: {
      type: String,
      default: 'w-1/2'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
})

const emit = defineEmits(['update:modelValue', 'close', 'confirm'])

function close() {
    emit('close')
    emit('update:modelValue', false) 
}
</script>

<template>
    <TransitionRoot appear :show="props.modelValue" as="template">
      <Dialog as="div" class="relative">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed z-10 inset-0 bg-primary/40" aria-hidden="true" />
        </TransitionChild>
  
        <div class="fixed inset-0 z-20 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center relative"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                :style="`width: ${props.width}`"
                class="transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <img @click="close" src="@/assets/img/close.svg" alt="close" class="absolute top-4 right-4 cursor-pointer">

                <slot />
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>

  
  