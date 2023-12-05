<script setup lang="ts">
import { type PropType } from 'vue';
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
// import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'

interface SelectOptionModel {
    label: string;
    value: string | number;
}

const props = defineProps({
    id: {
        type: [String, Number],
        default: Math.random()
    },
    label: {
        type: String,
        default: ''
    },
    options: {
        type: Array as PropType<SelectOptionModel[]>,
        required: true
    },
    modelValue: {
        type: [String, Number, Object],
        default: ''
    },
    trackBy: {
        type: String,
        default: 'label'
    },
    disabled: {
        type: Boolean,
        default: false
   },
   color: {
        type: String,
        default: false
    },
})

const emit = defineEmits(['update:modelValue', 'select'])

const value = computed({
    get() {
        for (const option of props.options) {
            if (option.value === props.modelValue) {
                return option
            }
        }

        const option = props.options?.[0]

        if (option) {
            emit('update:modelValue', option.value)
            emit('select', option) // WHOLE OBJECT
            return option
        }        
    },
    set(value) {
        emit('update:modelValue', value?.value)

        emit('select', value) // WHOLE OBJECT
    }
})
</script>

<template>
    <div>
        <p class="pb-1">{{ props.label }}</p>
        <Listbox :class="props.color ? props.color : ''" :disabled="props.disabled" v-model="value">
            <div class="relative">
                <ListboxButton
                    class="relative w-full flex justify-between border border-gray-100 border-solid p-3 rounded-lg"
                >
                    <strong v-if="value" class="text-gray-800"> {{ value?.label }}</strong>
                    <ChevronDownIcon
                        class="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </ListboxButton>
        
                <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg"
                    >
                        <ListboxOption
                            required
                            v-slot="{ active, selected }"
                            v-for="option of props.options"
                            :key="option.label"
                            :value="option"
                            as="template"
                        >   
                            <li
                                class="relative cursor-pointer p-3 flex items-center justify-between"
                                :class="active || selected ? 'bg-gray-50' : ''"
                            >             
                                <strong :class="selected ? 'font-manrope-500' : ''">{{ props.label }}</strong>                                       
                                <CheckIcon v-if="selected" class="h-5 w-5 text-primary" aria-hidden="true" />
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>