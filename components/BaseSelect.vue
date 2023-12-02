<script setup lang="ts">
  import { ref } from 'vue'
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
  
const people = [
    { name: 'Wade Cooper' },
    { name: 'Arlene Mccoy' },
    { name: 'Devon Webb' },
    { name: 'Tom Cook' },
    { name: 'Tanya Fox' },
    { name: 'Hellen Schmidt' },
]

const props = defineProps({
    label: {
        type: String,
        default: ''
    }
})
const selectedPerson = ref(people[0])
</script>

<template>
    <div>
        <p class="font-commissioner-600 text-primary">{{ props.label }}</p>
        <Listbox v-model="selectedPerson">
            <div class="w-full relative mt-1">
            <ListboxButton
                class="bg-info-main flex items-center justify-between w-full"
            >
                <span class="block truncate">{{ selectedPerson.name }}</span>
                <img src="@/assets/img/down.svg" />
            </ListboxButton>
    
            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <ListboxOptions
                class="absolute mt-1 z-30 max-h-24 w-full overflow-auto rounded-md bg-white"
                >
                <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="person in people"
                    :key="person.name"
                    :value="person"
                    as="template"
                >
                    <li
                    :class="[
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                    ]"
                    >
                    <span
                        :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                        ]"
                        >{{ person.name }}</span
                    >
                    <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                    >
                        
                    </span>
                    </li>
                </ListboxOption>
                </ListboxOptions>
            </transition>
            </div>
        </Listbox>
    </div>
</template>

  