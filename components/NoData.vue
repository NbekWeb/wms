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
                <h2 class="text-3xl text-text font-commissioner-700 mt-2 text-center">Здесь пока пусто</h2>

                <button @click="$emit('set')" class="flex items-center bg-black text-white space-x-2 mx-auto mt-8">
                    <img src="@/assets/img/plus.svg" alt="plus">
                    <span>{{ props.title }}</span>
                </button>
            </div>
        </div>
    </div>
</template>