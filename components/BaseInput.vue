<script lang="ts" setup>
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Введите'
    }
})
</script>

<template>
    <div class="flex flex-col">
        <label class="font-commissioner-600 text-primary-light">{{ props.label }}</label>
        <input type="text" placeholder="Введите имя" class="bg-info-main mt-1 rounded-xl border border-white">
    </div>
</template>

<style lang="scss">

</style>