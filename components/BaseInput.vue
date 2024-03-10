<script lang="ts" setup>
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Введите'
    },
    bgColor: {
        type: String,
        default: 'bg-info-main'
    },
    type: {
        type: String,
        default: 'text'
    }
})

const modelValue = defineModel()
</script>

<template>
    <div class="flex flex-col">
        <label class="font-commissioner-600 text-primary-light">{{ props.label }}</label>
        <input 
            v-model="modelValue"
            :type="props.type" 
            :placeholder="$t('enterName')" 
            class="mt-1 rounded-xl border border-white bg-[#F4F7FB]"
            :class="bgColor"
        >
    </div>
</template>

<style lang="scss">

</style>