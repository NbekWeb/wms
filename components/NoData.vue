<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="h-full">
        <div class="flex items-center w-full">
            <div class="w-96 mx-auto">
                <img src="@/assets/img/noData.svg" alt="noData">
                <h2 class="text-3xl text-text font-commissioner-700 mt-2 text-center">{{ $t('empty') }}</h2>

                <button @click="$emit('set')" class="flex h-12 items-center bg-black text-white space-x-3 mx-auto mt-8">
                    <i class="icon-plus white"></i>
                    <span>{{ props.title }}</span>
                </button>
            </div>
        </div>
    </div>
</template>